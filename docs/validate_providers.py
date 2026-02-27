#!/usr/bin/env python3
"""
Provider Data Validator
Validates Zola provider files against JSON schema
"""

import json
import sys
import re
from pathlib import Path

def extract_toml_frontmatter(content):
    """Extract TOML frontmatter from Zola markdown file"""
    pattern = r'^\+\+\+(.*?)\+\+\+'
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return None
    return match.group(1).strip()

def toml_to_dict(toml_str):
    """Simple TOML parser for provider frontmatter"""
    try:
        import tomli
        return tomli.loads(toml_str)
    except ImportError:
        # Fallback: use toml library
        try:
            import toml
            return toml.loads(toml_str)
        except ImportError:
            print("Error: Install tomli or toml library: pip install tomli", file=sys.stderr)
            sys.exit(1)

def validate_provider(provider_file, schema):
    """Validate a provider file against schema"""
    try:
        content = provider_file.read_text(encoding='utf-8')
        frontmatter = extract_toml_frontmatter(content)
        
        if not frontmatter:
            return False, f"No TOML frontmatter found"
        
        data = toml_to_dict(frontmatter)
        
        # Basic validation against schema
        errors = []
        
        # Check required fields
        required = schema.get('required', [])
        for field in required:
            if field not in data:
                errors.append(f"Missing required field: {field}")
        
        # Validate slug pattern
        if 'slug' in data:
            slug = data['slug']
            if not re.match(r'^[a-z0-9]+(-[a-z0-9]+)*$', slug):
                errors.append(f"Invalid slug format: {slug}")
        
        # Validate services enum
        if 'taxonomies' in data and 'services' in data['taxonomies']:
            valid_services = schema['properties']['taxonomies']['properties']['services']['items']['enum']
            for service in data['taxonomies']['services']:
                if service not in valid_services:
                    errors.append(f"Invalid service: {service}")
        
        # Validate website URL
        if 'extra' in data and 'website' in data['extra']:
            website = data['extra']['website']
            if not website.startswith(('http://', 'https://')):
                errors.append(f"Invalid website URL: {website}")
        
        if errors:
            return False, "; ".join(errors)
        
        return True, "Valid"
        
    except Exception as e:
        return False, f"Parse error: {str(e)}"

def main():
    schema_path = Path(__file__).parent / 'provider-schema.json'
    providers_dir = Path(__file__).parent.parent / 'content' / 'providers'
    
    if not schema_path.exists():
        print(f"Error: Schema not found at {schema_path}", file=sys.stderr)
        sys.exit(1)
    
    schema = json.loads(schema_path.read_text())
    
    provider_files = list(providers_dir.glob('*/index.md')) + list(providers_dir.glob('*/index.en.md'))
    
    if not provider_files:
        print("No provider files found", file=sys.stderr)
        sys.exit(1)
    
    errors = []
    valid_count = 0
    
    for provider_file in sorted(provider_files):
        is_valid, message = validate_provider(provider_file, schema)
        
        if is_valid:
            valid_count += 1
            print(f"✓ {provider_file.relative_to(providers_dir.parent)}")
        else:
            errors.append((provider_file, message))
            print(f"✗ {provider_file.relative_to(providers_dir.parent)}: {message}")
    
    print(f"\n{valid_count}/{len(provider_files)} files valid")
    
    if errors:
        sys.exit(1)
    
    sys.exit(0)

if __name__ == '__main__':
    main()
