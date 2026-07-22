---
title: Annotated
---

<svg width="0" height="0" style="position:absolute">
  <defs>
    <filter id="roughen-soft" x="-50%" y="-50%" width="200%" height="200%">
      <feTurbulence type="fractalNoise" baseFrequency="0.015 0.045" numOctaves="3" seed="7" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="34" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
      <feGaussianBlur in="displaced" stdDeviation="1.1"/>
    </filter>
  </defs>
</svg>

<div class="wrap">

<details class="fold-nav-wrap">
  <summary class="fold-nav-button" aria-label="Menu">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <line x1="4" y1="7" x2="20" y2="7"></line>
      <line x1="4" y1="12" x2="20" y2="12"></line>
      <line x1="4" y1="17" x2="20" y2="17"></line>
    </svg>
  </summary>
  <nav class="fold-nav-panel">
    <a href="./">Home</a>
    <a href="./sources">Sources</a>
    <a href="./ideas">Ideas</a>
    <a href="./publications">Publications</a>
    <a href="./bibliography">Bibliography</a>
    <a href="./map">Map</a>
    <a href="./about">About</a>
  </nav>
</details>

<svg class="masthead-smear" viewBox="0 0 820 400" preserveAspectRatio="none">
  <g style="mix-blend-mode:multiply">
  <path d="M816 258 Q750 280 660 250 Q560 260 500 272 Q450 272 380 200 Q310 138 220 155 Q140 168 70 145
           Q140 190 220 230 Q310 275 400 250 Q470 232 540 280 Q610 328 700 350 Q770 375 816 258 Z"
        fill="#c99a2e" opacity="0.42" filter="url(#roughen-soft)"/>
  <path d="M816 258 Q660 240 550 250 Q440 262 370 195 Q300 135 210 150"
        fill="none" stroke="#c99a2e" stroke-width="34" stroke-linecap="round" opacity="0.32" filter="url(#roughen-soft)"/>
  <path d="M816 258 Q660 190 470 130 Q360 150 240 155"
        fill="none" stroke="#c99a2e" stroke-width="40" stroke-linecap="round" opacity="0.34" filter="url(#roughen-soft)"/>
  <path d="M816 258 Q690 250 570 250 Q460 266 380 220 Q320 188 250 195"
        fill="none" stroke="#c99a2e" stroke-width="30" stroke-linecap="round" opacity="0.26" filter="url(#roughen-soft)"/>
  </g>
  <circle cx="800" cy="240" r="6" fill="#c99a2e" opacity="0.4" filter="url(#roughen-soft)"/>
  <circle cx="812" cy="285" r="4.5" fill="#c99a2e" opacity="0.35" filter="url(#roughen-soft)"/>
  <circle cx="790" cy="220" r="4" fill="#c99a2e" opacity="0.32" filter="url(#roughen-soft)"/>
</svg>

<p class="eyebrow">an interdisciplinary research archive</p>
<h1 class="masthead"><a href="/">Annotated</a></h1>

<img src="./static/underline-mark.png" class="pencil-rule" alt="" />

<p class="epigraph">a note on the system this archive is organized by</p>

<p class="intro-note">
<span class="mark-circle-hover">Sources</span>, <span class="mark-circle-hover">ideas</span>, and <span class="mark-circle-hover">working theory</span> — a running archive spanning performance studies, <span class="mark-strike-hover">curatorial practice</span>, cultural theory, and creative writing.
</p>

<nav>
  <a href="/Sources">Sources</a>
  <a href="/Ideas">Ideas</a>
  <a href="/Publications">Publications</a>
  <a href="/Bibliography">Bibliography</a>
  <a href="/Map">Map</a>
  <a href="/About">About</a>
</nav>

</div>