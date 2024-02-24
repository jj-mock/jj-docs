# Attribute Matchers

Attribute Matchers extend the capabilities of request matching by allowing more nuanced conditions than simple equality checks.

### EqualMatcher

The `EqualMatcher` is used to specify that a request attribute must exactly match a given value. It is the default matcher for several request matchers, such as [MethodMatcher](/docs/matchers/request-matchers#matching-single-method).

```python
from jj.matchers import equals

jj.match_method(equals("GET"))
```

This configuration matches only HTTP `GET` requests, demonstrating the matcher's use in filtering requests by their method.

#### NotEqualMatcher

To exclude a specific value while matching request attributes, the `NotEqualMatcher` comes into play.

```python
from jj.matchers import not_equals

jj.match_method(not_equals("GET"))
```

Here, any HTTP method other than `GET` will be matched, showcasing the matcher's utility in negating specific conditions.

### ContainMatcher

The `ContainMatcher` checks if a request attribute contains a specific substring.

```python
from jj.matchers import contains

jj.match_param("search", contains("banana"))
```

This example matches requests where the query parameter `search` includes the substring "banana," useful for partial text matching.

#### NotContainMatcher

Conversely, the `NotContainMatcher` ensures that a request attribute does not contain a specified substring.

```python
from jj.matchers import not_contains

jj.match_param("search", not_contains("banana"))
```

In this case, it matches requests where the query parameter `search` does not include "banana," allowing for exclusion based on content.

### RegexMatcher

For matching based on regular expressions, the `RegexMatcher` provides a powerful tool.

```python
from jj.matchers import regex

jj.match_header("User-Agent", regex(r"^Mozilla/5.0.*"))
```

This matcher is employed to filter requests by the `User-Agent` header, specifically targeting those starting with "Mozilla/5.0," illustrating regex's flexibility in matching patterns.

### ExistMatcher

To simply check for the presence of an attribute, the `ExistMatcher` is used.

```python
from jj.matchers import exists

jj.match_header("Authorization", exists)
```

This example ensures a match if the `Authorization` header exists, regardless of its value, highlighting the matcher's role in verifying attribute presence.
