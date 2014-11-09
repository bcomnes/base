base
====

(Working title)

A base jekyll layout that is designed to pair with [gitpub](https://github.com/bcomnes/gitpub).  It aims at supporting various post types through progressive enhancement based on the presence of specific font-matter variables.  Here are some guiding design principals.

- All posts start as a note and can be enhanced with yaml front-matter
- Post types are differentiated by how they are displayed
- Temporal posts can contain (usually) a single 'item'
- Items are things like pictures, videos, audio, a map that serve as the primary thing of interest of a post.
- Items are just meta-data that can be stored in front-matter
- Item data should be provided externally from git
- Posts can be enhanced with optional meta-data

## Notes

The following examples and variations result in a note post format.

### Basic Note

```yaml
---
title: null
date: 2014-10-28 17
---
```

Notes require the front-matter `title` field be set to `null` in order to decouple the `title` variable from the `titleized` title it inherits from the filename.  See [jekyll/jekyll #3046](https://github.com/jekyll/jekyll/issues/3046#issuecomment-61379322).  Forgetting this wont break anything, but it will reduce the quality of the `<title>` tag in the header of note permalinks.

### `in-reply-to` Note

```yaml
---
title: null
date: 2014-10-28 17
in-reply-to:
  - url: "https://snarfed.org/2013-01-16_atom_feeds_for_facebook_and_twitter"
    domain: "snarfed.org"
---
```

The most basic form of a reply.  Displays a simple "In Reply To: `{{ in-reply-to[*].url }}`" above the post.  TODO:  use the Jekyll Data store to create a list of queryable contacts based on the `{{ in-reply-to[*].domain }}` field in order to display information on people over domains.

TODO: Store reply context data and display reply context above reply notes.

### Note with photo

```yaml
---
date: 2014-11-01 13:08
title: null
items:
  - type: photo
    filename: igljSlhv.jpg
    name: Circle Packing
    src: /media/igljSlhv.jpg
---
```

Creates a post with a photo above the post content.  The alt text is assigned to `{{ items[*].name }}` or `{{ items[*].filename }}` or nothing if those values are not present.  `type` determines the include file to insert above the note text.

## Articles

Articles are notes that have a `{{ page.title }}` front-matter set.  The title is front and center and is geared towards long form.

### Basic Article

```yaml
---
title: This is an article
date: 2014-10-28 17:34
---
```
### Article with photo


```yaml
---
date: 2014-11-01 13:09
title: Article with attatched photo
items:
  - filename: igljSlhv.jpg
    type: photo
    workPath: /media
    src: /media/igljSlhv.jpg
---
```
