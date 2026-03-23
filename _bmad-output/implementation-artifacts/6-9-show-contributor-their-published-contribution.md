# Story 6.9: Show Contributor Their Published Contribution

Status: done

## Story

As a **contributor**,
I want to see my contribution published after maintainer approval,
So that I can verify my provider page is live on the site.

## Acceptance Criteria

1. After PR is merged to main, the site automatically regenerates
2. New provider page is live at a predictable URL
3. Contributor can access their published provider page

## Implementation

`.github/workflows/build.yml` triggers on every push to `main`:
1. Runs `zola build` to regenerate the complete static site
2. Deploys to GitHub Pages via `actions/deploy-pages@v4`
3. New provider at `content/providers/{slug}/` becomes live at `https://cloudlandscape.github.io/providers/{slug}/`

URL pattern is predictable from the slug:
- FR: `https://cloudlandscape.github.io/providers/{slug}/`
- EN: `https://cloudlandscape.github.io/en/providers/{slug}/`

`CONTRIBUTING.md` documents: "Once your PR is merged, your provider will be available at cloudlandscape.github.io/providers/your-slug/"
