base
====

(Working title)

A base jekyll layout that is designed to pair with [gitpub](https://github.com/bcomnes/gitpub).  It aims at supporting various post types through progressive enhancement based on the presence of specific front-matter variables.  Here are some guiding design principals.

- All posts start as a note and can be enhanced with yaml front-matter
- Post types are differentiated by how they are displayed
- Temporal posts can contain (usually) a single 'item'
- Items are things like pictures, videos, audio, a map that serve as the primary thing of interest of a post.
- Items are just meta-data that can be stored in front-matter
- Item data should be provided externally from git
- Posts can be enhanced with optional meta-data

## Base Front-Matter Definitions and Behaviors

### Post types

The following yaml front-matter combinations will result in display differences depending on how post types are classified.

#### Note

```yaml
---
title: null
date: 2014-10-28 17
---
```

Notes require the front-matter `title` field be set to `null` in order to decouple the `title` variable from the `titleized` title it inherits from the filename.  See [jekyll/jekyll #3046](https://github.com/jekyll/jekyll/issues/3046#issuecomment-61379322).  Forgetting this wont break anything, but it will reduce the quality of the `<title>` tag in the header of note permalinks.

Notes tend to be relatively short.

#### Article

```yaml
---
title: This is an article
date: 2014-10-28 17:34
---

Articles are notes that have a `{{ page.title }}` front-matter set.  The title is front and center and is geared towards long form.

### Items

```yaml
---
date: 2014-11-01 13:08
title: null
items:
  - type: photo
  - type: youtube
  - type: vimeo
  - type: audio
---

Items are entries of the `item` front-matter array.  The `{{ item[*].type }}` determines what the item is and which `_include` template to use when inserting them into the page.  Items are displayed in order above the post content.

Items can be added to any post type.

#### Photo Item (As a note)

```yaml
---
title: null
date: 2014-11-01 13:08
items:
  - type: photo
    name: Circle Packing
    filename: igljSlhv.jpg
    src: http://bret.io/base/media/igljSlhv.jpg
---
```

Adds a photo item above the post content.  The alt text is assigned to `{{ items[*].name }}` or `{{ items[*].filename }}` or nothing if those values are not present.  Relative URLs are supported but discouraged.  A reliable data store should be used to host the photo, and fully defined URLs used to point to the URL.

TODO: Responsive Images

#### Youtube Item

TODO: Youtube Embed item

#### Vimeo Item

TODO: Vimeo Embed Item

#### Audio Item

TODO: Audio Item

#### Map Item

TODO: Map Item Embed

### Syndication

```yaml
syndication:
  - name: Instagram
    url: http://instagram.com/p/xxxxx/
  - name: Twitter
    url: "https://twitter.com/example/status/xxxxx"
```

The `syndication` front-matter array lists off places where the post has been syndicated to.  Syndication links are displayed as reply target suggestions as most people do not have their own website.

Syndication can be added to any post type.

### Client

```yaml
client:
  id: "http://quill.p3k.io"
  name: "Quill"
  scope: post
```

The `client` front-matter object contains information about the client used to create the post.

Client can be added to any post type.

### Geo

```yaml
geo:
  location: "geo:45.524813313,-122.681201062"
  place-name: Portland, OR
```

The `geo` front-matter object contains information about the location the post was created at.  There is overlap/conflict with the Map item that may require resolution.  The geo information displays the `place-name`.  The location data is looking for use.

Geo can be added to any post type.

### Tags

```yaml
tags:
  - photo
  - geo
  - items
```

The `tags` front-matter array allows posts to be tagged and displayed in the tag directory page.  Posts can have many tags.  Tags are a standard jekyll feature.  Tags do not affect the permalink of posts.

### Categories

```yaml
categories:
  - note
  - article
  - photo
```

The `categories` front-matter array allows posts to be categorized and displayed in the category directory page.  Posts can have many category, but this is discouraged as it results in many permanents.  Posts should only have a single category.  Categories are a standard jekyll feature.  Tags affect the permalink of posts and can be assigned to posts by housing additional `_post` directories under category folders.


### Reply Context

Reply context is meta data that is added to the front-matter to indicate that the post is in reply to another permalink.  Can be added to a note.

TODO:  Taylor reply context display for use with Articles.

#### Basic Reply Context

```yaml
in-reply-to:
  - url: "https://snarfed.org/2013-01-16_atom_feeds_for_facebook_and_twitter"
    domain: "snarfed.org"
```

Displays a simple "In Reply To: `{{ in-reply-to[*].url }}`" above the post.

#### Contact Reply Context

TODO:  Use the Jekyll Data store to create a list of queryable contacts based on the `{{ in-reply-to[*].domain }}` field in order to display information on people over domains.

#### Full Content Reply Context

TODO: Store reply context data and display reply context above reply notes.

