base
====

(Working title)

A base jekyll layout that is designed to pair with [gitpub](https://github.com/bcomnes/gitpub).  It aims at supporting various post types through progressive enhancement based on the presence of specific front-matter variables.  Here are some guiding design principles.

- Static sites should be low maintenance.
- Static sites should be nearly free to host.
- Static sites should be flexible to the needs of the publisher.
- Running servers should be [mostly] optional.
- As external services die off, the primary content should still remain in tact.


- All posts start as a note and can be enhanced with yaml front-matter
- Post types are differentiated by how they are displayed
- Temporal posts can contain (usually) a single 'item'
- Items are things like pictures, videos, audio, a map that serve as the primary thing of interest of a post.
- Items are just meta-data that can be stored in front-matter
- Item data should be provided externally from git
- Posts can be enhanced with optional meta-data


- Clients should only have to load a single CSS file.
- Clients should only have to find a single script entry point.
- External assets are kept out of the repository.
- External assets are loaded from a CDN.
- Layout and CSS should stand mostly on its own and not reply on a massive generalized framework.
- Data that depends on external JS libraries should present something useful if those libraries fail to load.

## Base Front-Matter Definitions and Behaviors

### Post types

The following yaml front-matter combinations will result in display differences depending on how post types are classified.

#### Note

```yaml
---
date: 2014-10-28 17
---
```

Post titles are determined by the `name` front-matter variable.  If this is not set, you get a titless "note".

Notes tend to be relatively short.

#### Article

```yaml
---
name: This is an article
date: 2014-10-28 17:34
---
```

Articles are notes that have the `{{ page.name }}` front-matter set.  The name is displayed front and center and is geared towards long form.  While this diverges from Jekyll convention of using `title` as the variable used to name posts (unfortunately), but it is consistent with Microformats 2 h-entry vocab.

The `title` variable is strongly coupled with the titleified file name so it can't be checked for existence since it always exists!

### Items

```yaml
---
date: 2014-11-01 13:08
items:
  - type: photo
  - type: youtube
  - type: vimeo
  - type: audio
---
```

Items are entries of the `item` front-matter array.  The `{{ item[*].type }}` determines what the item is and which `_include` template to use when inserting them into the page.  Items are displayed in order above the post content.

Items can be added to any post type.

#### Photo Item (As a note)

```yaml
---
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

#### Recipe Item

TODO: Recipe Item

#### Event Item

TODO: Event Item

#### RSVP Item

TODO: RSVP Item

#### Reply Context

TODO: Figure out overlap between items and out-of-post-content band reply context.

#### Repost Item

TODO: Figure out reposts.

#### Youtube Item

TODO: Youtube Embed item

#### Vimeo Item

TODO: Vimeo Embed Item

#### Audio Item

TODO: Audio Item

#### Map Item

TODO: Map Item Embed

#### Like Item

TODO: Like Item

#### Bookmark Item

TODO: Bookmark/linklog Item

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
  - burgers
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

Reply context is meta data that is added to the front-matter to indicate that the post is in reply to another permalink.  Can be added to a note.  Turning this into an item is a possibility.

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

### Delete items

TODO: Handle a deleted yaml object to preserve permalinks and use http equiv to indicate its deleted.

## SCSS and Theming

TODO: Figure out how to handle CSS and themes.  It would be nice to connect the css to a framework like bootstrap.

- http://webdesign.tutsplus.com/tutorials/a-simple-responsive-mobile-first-navigation--webdesign-6074
- http://www.bootstrapcdn.com
- http://necolas.github.io/normalize.css/
- http://ruby.bvision.com/blog/please-stop-embedding-bootstrap-classes-in-your-html
- http://blog.typekit.com/2013/07/25/setting-subheads-with-css/
- http://www.svgeneration.com
- https://gist.github.com/bcomnes/d8153d88664a4875b592
- http://jsbin.com/juvixufu/10/edit?html,outputin
- http://philipwalton.github.io/solved-by-flexbox/
- http://bennettfeely.com/flexplorer/

## JS Library Loading

Due to the mixed content nature of the item stream, a JS library loader is needed to accommodate the flexibility of what one might want in the post stream.  See [`enhanceEach`](https://waterpigs.co.uk/notes/4WZHhH/).

### Global Included Libraries

- [Require.js](http://requirejs.org)
- [Prefixfree](http://leaverou.github.io/prefixfree/)
- [Fragmention](https://github.com/chapmanu/fragmentions)

### Dyanmicaly loaded JS Libraries

These libraries are loaded only when an element on the page indicates that they are needed.  This is acehived by [`enhanceEach`](https://waterpigs.co.uk/notes/4WZHhH/).

- Leaflet
- [Insert embed loader here]
- [Insert Improved html5 video/audio player]
- ...

## Appcache

TODO: Fix appcache. See [alistapart](http://alistapart.com/article/application-cache-is-a-douchebag#section7) on appcache.

## Conflicting Concepts

- Post geo metadata and map item potentially overlap.
- In reply to item type, metadata in-reply-to and repost item.

