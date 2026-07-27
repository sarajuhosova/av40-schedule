---
layout: home
title: Test
---

<div>
{% capture nowunix %}{{ 'now' | date: '%s' }}{% endcapture %}

{% for quarter in site.data.schedule.index %}
    {% capture quarterend %}{{ quarter.end | date: '%s' }}{% endcapture %}
    {% if nowunix < quarterend %}
        {% assign year = quarter.year %}
        {% assign folder = site.data.schedule[year] %}
        {% for f in folder %}
            <p>{{ f }}</p>
        {% endfor %}

        {% capture file %}q{{ quarter.quarter }}{% endcapture %}
        {% for training in site.data.schedule.2026[file] %}
            <p>{{ training.day }}</p>
        {% endfor %}
    {% endif %}
{% endfor %}
</div>
