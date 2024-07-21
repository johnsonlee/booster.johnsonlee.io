import{r as t,o,c as l,a as s,b as n,d as e,F as r,e as a}from"./app.9958f85a.js";import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";const c={},u=a(`<h1 id="\u7B2C\u4E00\u4E2A-classtransformer" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u4E00\u4E2A-classtransformer" aria-hidden="true">#</a> \u7B2C\u4E00\u4E2A ClassTransformer</h1><h2 id="\u521B\u5EFA\u5DE5\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u5DE5\u7A0B" aria-hidden="true">#</a> \u521B\u5EFA\u5DE5\u7A0B</h2><p>\u5728\u5199\u7B2C\u4E00\u4E2A <em>ClassTransformer</em> \u4E4B\u524D\uFF0C\u9700\u8981\u6709\u4E00\u4E2A <em>Java</em> \u6216 <em>Kotlin</em> \u5DE5\u7A0B\uFF0C\u8FD9\u91CC\u6709\u4E24\u79CD\u5DE5\u7A0B\u5F62\u5F0F\u3002</p><h3 id="buildsrc-\u5DE5\u7A0B" tabindex="-1"><a class="header-anchor" href="#buildsrc-\u5DE5\u7A0B" aria-hidden="true">#</a> buildSrc \u5DE5\u7A0B</h3><p>\u5982\u679C\u5DF2\u7ECF\u6709\u4E00\u4E2A <em>Android</em> \u5DE5\u7A0B\u4E86\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u5DE5\u7A0B\u6839\u76EE\u5F55\u65B0\u5EFA\u4E00\u4E2A <em>buildSrc</em> \u76EE\u5F55\uFF0C<em>Gradle</em> \u4F1A\u628A <em>buildSrc</em> \u5F53\u4F5C\u6784\u5EFA\u5DE5\u7A0B\uFF0C\u5BF9\u5B83\u8FDB\u884C\u7F16\u8BD1\u548C\u6D4B\u8BD5\uFF0C\u7136\u540E\u5C06\u5176\u52A0\u5165 <em>buildscript</em> \u7684 <em>classpath</em> \u4E2D\uFF0C\u5BF9\u4E8E\u6709\u591A\u4E2A\u5B50\u7A0B\u7684\u9879\u76EE\u6765\u8BF4\uFF0C\u53EA\u80FD\u6709\u4E00\u4E2A <em>buildSrc</em> \u76EE\u5F55\u4F4D\u4E8E\u5DE5\u7A0B\u6839\u76EE\u5F55\uFF0C\u5BF9\u4E8E\u590D\u6742\u7684\u6784\u5EFA\u6765\u8BF4\uFF0C\u4F18\u5148\u9009\u62E9\u901A\u8FC7 <em>buildSrc</em> \u6765\u7EC4\u7EC7\u6784\u5EFA\u811A\u672C\u3002</p><p>\u7136\u540E\u5728 <em>buildSrc</em> \u76EE\u5F55\u4E0B\uFF0C\u521B\u5EFA\u5982\u4E0B\u76EE\u5F55\u7ED3\u6784\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>buildSrc/
\u251C\u2500\u2500 build.gradle
\u2514\u2500\u2500 src
    \u2514\u2500\u2500 main
        \u251C\u2500\u2500 java
        \u2514\u2500\u2500 kotlin
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><blockquote><p>\u5BF9\u4E8E <em>Android</em> \u5F00\u53D1\u8005\u6765\u8BF4\uFF0C\u63A8\u8350\u7528 <em>buildSrc</em> \u7684\u65B9\u5F0F\uFF0C\u8FD9\u6837\u5728\u4E00\u4E2A\u5DE5\u7A0B\u4E2D\uFF0C\u4E0A\u624B\u66F4\u5BB9\u6613\u3002</p></blockquote><h3 id="\u72EC\u7ACB\u7684-java-\u5DE5\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u72EC\u7ACB\u7684-java-\u5DE5\u7A0B" aria-hidden="true">#</a> \u72EC\u7ACB\u7684 Java \u5DE5\u7A0B</h3><p>\u5982\u679C\u9700\u8981\u5C06 <em>ClassTransformer</em> \u5171\u4EAB\u7ED9\u591A\u4E2A <em>Android</em> \u5DE5\u7A0B\uFF0C\u91C7\u7528\u72EC\u7ACB\u7684 <em>Java</em> \u5DE5\u7A0B\u4F1A\u66F4\u5408\u9002\u3002</p><p>\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7 <em>gradle</em> \u547D\u4EE4\uFF0C\u6765\u521B\u5EFA\u4E00\u4E2A <em>Java</em> \u5DE5\u7A0B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">mkdir</span> BoosterDemo                 <span class="token comment"># \u521B\u5EFA BoosterDemo \u5DE5\u7A0B </span>
$ <span class="token builtin class-name">cd</span> BoosterDemo <span class="token operator">&amp;&amp;</span> gradle init     <span class="token comment"># \u521D\u59CB\u5316\u5DE5\u7A0B</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u7136\u540E\u9009\u62E9\u5DE5\u7A0B\u7C7B\u578B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Starting a Gradle Daemon (subsequent builds will be faster)

Select type of project to generate:
  1: basic
  2: application
  3: library
  4: Gradle plugin
Enter selection (default: basic) [1..4]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u8FD9\u91CC\uFF0C\u6211\u4EEC\u9009\u62E9 <em>3: library</em>\uFF0C\u63A5\u4E0B\u6765\uFF0C\u9009\u62E9\u8BED\u8A00\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Select implementation language:
  1: C++
  2: Groovy
  3: Java
  4: Kotlin
  5: Scala
  6: Swift
Enter selection (default: Java) [1..6]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u8FD9\u91CC\u53EF\u4EE5\u6839\u636E\u81EA\u5DF1\u7684\u559C\u597D\u9009\u62E9\uFF1A <em>Groovy</em> / <em>Java</em> / <em>Kotlin</em> \uFF0F <em>Scala</em> \u5176\u4E2D\u4E4B\u4E00\uFF0C\u5047\u8BBE\uFF0C\u6211\u4EEC\u9009\u62E9 <em>4: Kotlin</em>\uFF1A</p><p>\u63A5\u4E0B\u6765\uFF0C\u9009\u62E9\u6784\u5EFA\u811A\u672C\u7684 <em>DSL</em>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Select build script DSL:
  1: Groovy
  2: Kotlin
Enter selection (default: Kotlin) [1..2]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u5982\u679C\u5BF9 <em>Kotlin DSL</em> \u4E0D\u592A\u719F\u7684\u8BDD\uFF0C\u53EF\u4EE5\u9009\u62E9 <em>1: Groovy</em>\uFF1A</p><p>\u7136\u540E\uFF0C\u8F93\u5165\u5DE5\u7A0B\u540D\uFF0C\u6216\u8005\u7528\u9ED8\u8BA4\u7684\u5DE5\u7A0B\u540D\uFF08\u76EE\u5F55\u540D\uFF09\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Project name (default: BoosterDemo):
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u7136\u540E\u8F93\u5165\u6E90\u4EE3\u7801\u7684\u5305\u540D\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Source package (default: BoosterDemo): io.johnsonlee.booster.demo
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u8FD9\u6837\uFF0C<em>Java Library</em> \u5DE5\u7A0B\u5C31\u521B\u5EFA\u597D\u4E86\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.
\u251C\u2500\u2500 build.gradle
\u251C\u2500\u2500 gradle
\u2502   \u2514\u2500\u2500 wrapper
\u2502       \u251C\u2500\u2500 gradle-wrapper.jar
\u2502       \u2514\u2500\u2500 gradle-wrapper.properties
\u251C\u2500\u2500 gradlew
\u251C\u2500\u2500 gradlew.bat
\u251C\u2500\u2500 settings.gradle
\u2514\u2500\u2500 src
    \u251C\u2500\u2500 main
    \u2502   \u251C\u2500\u2500 kotlin
    \u2502   \u2502   \u2514\u2500\u2500 io
    \u2502   \u2502       \u2514\u2500\u2500 johnsonlee
    \u2502   \u2502           \u2514\u2500\u2500 booster
    \u2502   \u2502               \u2514\u2500\u2500 Library.kt
    \u2502   \u2514\u2500\u2500 resources
    \u2514\u2500\u2500 test
        \u251C\u2500\u2500 kotlin
        \u2502   \u2514\u2500\u2500 io
        \u2502       \u2514\u2500\u2500 johnsonlee
        \u2502           \u2514\u2500\u2500 booster
        \u2502               \u2514\u2500\u2500 LibraryTest.kt
        \u2514\u2500\u2500 resources
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u5982\u679C\u91C7\u7528\u72EC\u7ACB\u7684 <em>Java Library</em> \u5DE5\u7A0B\u9700\u8981\u5C06 <em>Java Library</em> \u5DE5\u7A0B\u53D1\u5E03\u5230 Maven \u4ED3\u5E93\u624D\u80FD\u96C6\u6210\u5230 Android \u5DE5\u7A0B\u4E2D\uFF0C\u4F8B\u5982\uFF1A\u53D1\u5E03\u5230\u672C\u5730 Maven \u4ED3\u5E93\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>./gradlew publishToMavenLocal
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div><h2 id="\u5F15\u5165-booster" tabindex="-1"><a class="header-anchor" href="#\u5F15\u5165-booster" aria-hidden="true">#</a> \u5F15\u5165 <em>Booster</em></h2><p>\u51C6\u5907\u597D\u5DE5\u7A0B\u540E\uFF0C\u63A5\u4E0B\u6765\u5728 <em>Java Library</em> \u5DE5\u7A0B\u6216\u8005 <em>Android</em> \u5DE5\u7A0B\u7684 <em>buildSrc</em> \u76EE\u5F55\u4E2D\u7684 <em>build.gradle</em> \u6587\u4EF6\u4E2D\uFF0C\u5F15\u5165 <em>Booster</em> \u4F9D\u8D56\uFF1A</p><div class="language-groovy ext-groovy line-numbers-mode"><pre class="language-groovy"><code>buildscript <span class="token punctuation">{</span>
    ext <span class="token punctuation">{</span>
        agp_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;4.0.0&quot;</span></span>
        booster_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;4.16.3&quot;</span></span>
        kotlin_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.5.31&quot;</span></span>
    <span class="token punctuation">}</span>
    repositories <span class="token punctuation">{</span>
        <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">jcenter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://oss.sonatype.org/content/repositories/public/&#39;</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://oss.sonatype.org/content/repositories/snapshots/&#39;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    dependencies <span class="token punctuation">{</span>
        classpath <span class="token interpolation-string"><span class="token string">&quot;org.jetbrains.kotlin:kotlin-gradle-plugin:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">kotlin_version</span></span><span class="token string">&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;kotlin&#39;</span>
apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;kotlin-kapt&#39;</span>

repositories <span class="token punctuation">{</span>
    <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">jcenter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://oss.sonatype.org/content/repositories/public/&#39;</span> <span class="token punctuation">}</span>
    maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://oss.sonatype.org/content/repositories/snapshots/&#39;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

sourceSets <span class="token punctuation">{</span>
    main <span class="token punctuation">{</span>
        java <span class="token punctuation">{</span>
            srcDirs <span class="token operator">+=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        kotlin <span class="token punctuation">{</span>
            srcDirs <span class="token operator">+=</span> <span class="token punctuation">[</span><span class="token string">&#39;src/main/kotlin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;src/main/java&#39;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    test <span class="token punctuation">{</span>
        java <span class="token punctuation">{</span>
            srcDirs <span class="token operator">+=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        kotlin <span class="token punctuation">{</span>
            srcDirs <span class="token operator">+=</span> <span class="token punctuation">[</span><span class="token string">&#39;src/main/kotlin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;src/main/java&#39;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

compileKotlin <span class="token punctuation">{</span>
    kotlinOptions<span class="token punctuation">.</span>jvmTarget <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_1_8
<span class="token punctuation">}</span>

compileTestKotlin <span class="token punctuation">{</span>
    kotlinOptions<span class="token punctuation">.</span>jvmTarget <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_1_8
<span class="token punctuation">}</span>

dependencies <span class="token punctuation">{</span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.android.tools.build:gradle:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">agp_version</span></span><span class="token string">&quot;</span></span>
    <span class="token comment">/* \u{1F447}\u{1F447}\u{1F447}\u{1F447} \u5F15\u7528\u8FD9\u4E24\u4E2A\u6A21\u5757 \u{1F447}\u{1F447}\u{1F447}\u{1F447} */</span>
    kapt <span class="token interpolation-string"><span class="token string">&quot;com.google.auto.service:auto-service:1.0&quot;</span></span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-api:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br></div></div><h2 id="\u57FA\u4E8E-asm" tabindex="-1"><a class="header-anchor" href="#\u57FA\u4E8E-asm" aria-hidden="true">#</a> \u57FA\u4E8E ASM</h2>`,31),b=s("em",null,"ASM",-1),m=s("em",null,"ClassTransformer",-1),k=s("code",null,"dependencies",-1),d={href:"https://github.com/didi/booster/tree/master/booster-transform-asm",target:"_blank",rel:"noopener noreferrer"},g=a(`<div class="language-groovy ext-groovy line-numbers-mode"><pre class="language-groovy"><code>dependencies <span class="token punctuation">{</span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.android.tools.build:gradle:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">agp_version</span></span><span class="token string">&quot;</span></span>
    <span class="token comment">/* \u{1F447}\u{1F447}\u{1F447}\u{1F447} \u5F15\u7528\u8FD9\u4E09\u4E2A\u6A21\u5757 \u{1F447}\u{1F447}\u{1F447}\u{1F447} */</span>
    kapt <span class="token interpolation-string"><span class="token string">&quot;com.google.auto.service:auto-service:1.0&quot;</span></span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-api:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-transform-asm:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">package</span> io<span class="token punctuation">.</span>johnsonlee<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>demo

<span class="token keyword">import</span> com<span class="token punctuation">.</span>didiglobal<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>transform<span class="token punctuation">.</span>TransformContext
<span class="token keyword">import</span> com<span class="token punctuation">.</span>didiglobal<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>transform<span class="token punctuation">.</span>asm<span class="token punctuation">.</span>ClassTransformer
<span class="token keyword">import</span> org<span class="token punctuation">.</span>objectweb<span class="token punctuation">.</span>asm<span class="token punctuation">.</span>tree<span class="token punctuation">.</span>ClassNode
<span class="token keyword">import</span> com<span class="token punctuation">.</span>google<span class="token punctuation">.</span>auto<span class="token punctuation">.</span>service<span class="token punctuation">.</span>AutoService

<span class="token annotation builtin">@AutoService</span><span class="token punctuation">(</span>ClassTransformer<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> FirstClassTransformer <span class="token operator">:</span> ClassTransformer <span class="token punctuation">{</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">transform</span><span class="token punctuation">(</span>context<span class="token operator">:</span> TransformContext<span class="token punctuation">,</span> klass<span class="token operator">:</span> ClassNode<span class="token punctuation">)</span><span class="token operator">:</span> ClassNode <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Transforming </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">klass<span class="token punctuation">.</span>name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> klass
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="\u57FA\u4E8E-javassist" tabindex="-1"><a class="header-anchor" href="#\u57FA\u4E8E-javassist" aria-hidden="true">#</a> \u57FA\u4E8E Javassist</h2>`,3),v=s("em",null,"Javassist",-1),f=s("em",null,"ClassTransformer",-1),h=s("code",null,"dependencies",-1),x={href:"https://github.com/didi/booster/tree/master/booster-transform-javassist",target:"_blank",rel:"noopener noreferrer"},y=a(`<div class="language-groovy ext-groovy line-numbers-mode"><pre class="language-groovy"><code>dependencies <span class="token punctuation">{</span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.android.tools.build:gradle:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">agp_version</span></span><span class="token string">&quot;</span></span>
    <span class="token comment">/* \u{1F447}\u{1F447}\u{1F447}\u{1F447} \u5F15\u7528\u8FD9\u4E09\u4E2A\u6A21\u5757 \u{1F447}\u{1F447}\u{1F447}\u{1F447} */</span>
    kapt <span class="token interpolation-string"><span class="token string">&quot;com.google.auto.service:auto-service:1.0&quot;</span></span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-api:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-transform-javassist:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">package</span> io<span class="token punctuation">.</span>johnsonlee<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>demo

<span class="token keyword">import</span> com<span class="token punctuation">.</span>didiglobal<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>transform<span class="token punctuation">.</span>TransformContext
<span class="token keyword">import</span> com<span class="token punctuation">.</span>didiglobal<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>transform<span class="token punctuation">.</span>javassist<span class="token punctuation">.</span>ClassTransformer
<span class="token keyword">import</span> com<span class="token punctuation">.</span>google<span class="token punctuation">.</span>auto<span class="token punctuation">.</span>service<span class="token punctuation">.</span>AutoService
<span class="token keyword">import</span> javassist<span class="token punctuation">.</span>CtClass

<span class="token annotation builtin">@AutoService</span><span class="token punctuation">(</span>ClassTransformer<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> FirstClassTransformer <span class="token operator">:</span> ClassTransformer <span class="token punctuation">{</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">transform</span><span class="token punctuation">(</span>context<span class="token operator">:</span> TransformContext<span class="token punctuation">,</span> klass<span class="token operator">:</span> CtClass<span class="token punctuation">)</span><span class="token operator">:</span> CtClass <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Transforming </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">klass<span class="token punctuation">.</span>name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> klass
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="\u914D\u7F6E-android-\u5DE5\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E-android-\u5DE5\u7A0B" aria-hidden="true">#</a> \u914D\u7F6E <em>Android</em> \u5DE5\u7A0B</h2><p>\u81F3\u6B64\uFF0C\u7B2C\u4E00\u4E2A <em>ClassTransformer</em> \u57FA\u672C\u5B8C\u6210\uFF0C\u63A5\u4E0B\u6765\u5728 <em>Android</em> \u5DE5\u7A0B\u7684 <em>build.gradle</em> \u4E2D\u914D\u7F6E <em>Booster</em>\uFF1A</p><div class="language-groovy ext-groovy line-numbers-mode"><pre class="language-groovy"><code>buildscript <span class="token punctuation">{</span>
    ext <span class="token punctuation">{</span>
        agp_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;4.0.0&quot;</span></span>
        booster_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;4.16.3&quot;</span></span>
        kotlin_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.5.31&quot;</span></span>
    <span class="token punctuation">}</span>
    repositories <span class="token punctuation">{</span>
        <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">jcenter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://oss.sonatype.org/content/repositories/public/&#39;</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://oss.sonatype.org/content/repositories/snapshots/&#39;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    dependencies <span class="token punctuation">{</span>
        classpath <span class="token interpolation-string"><span class="token string">&quot;com.android.tools.build:gradle:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">agp_version</span></span><span class="token string">&quot;</span></span>
        classpath <span class="token interpolation-string"><span class="token string">&quot;org.jetbrains.kotlin:kotlin-gradle-plugin:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">kotlin_version</span></span><span class="token string">&quot;</span></span>

        <span class="token comment">/* \u{1F447}\u{1F447}\u{1F447}\u{1F447} \u5F15\u7528 Booster Gradle \u63D2\u4EF6 \u{1F447}\u{1F447}\u{1F447}\u{1F447} */</span>
        classpath <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-gradle-plugin:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

allprojects <span class="token punctuation">{</span>
    repositories <span class="token punctuation">{</span>
        <span class="token function">mavenLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">jcenter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://oss.sonatype.org/content/repositories/public/&#39;</span> <span class="token punctuation">}</span>
        maven <span class="token punctuation">{</span> url <span class="token string">&#39;https://oss.sonatype.org/content/repositories/snapshots/&#39;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;com.android.application&#39;</span>
apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;kotlin-android&#39;</span>
apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;kotlin-android-extensions&#39;</span>

<span class="token comment">/* \u{1F447}\u{1F447}\u{1F447}\u{1F447} \u5E94\u7528 Booster \u63D2\u4EF6 \u{1F447}\u{1F447}\u{1F447}\u{1F447} */</span>
apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;com.didiglobal.booster&#39;</span>

android <span class="token punctuation">{</span>
    compileSdkVersion <span class="token number">28</span>
    buildToolsVersion <span class="token interpolation-string"><span class="token string">&quot;26.0.3&quot;</span></span>
    defaultConfig <span class="token punctuation">{</span>
        applicationId <span class="token string">&#39;io.johnsonlee.booster.demo&#39;</span>
        minSdkVersion <span class="token number">18</span>
        targetSdkVersion <span class="token number">26</span>
        versionCode <span class="token number">1</span>
        versionName <span class="token string">&#39;1.0&#39;</span>
        testInstrumentationRunner <span class="token interpolation-string"><span class="token string">&quot;androidx.test.runner.AndroidJUnitRunner&quot;</span></span>
    <span class="token punctuation">}</span>
    buildTypes <span class="token punctuation">{</span>
        debug <span class="token punctuation">{</span>
            minifyEnabled <span class="token boolean">false</span>
            proguardFiles <span class="token function">getDefaultProguardFile</span><span class="token punctuation">(</span><span class="token string">&#39;proguard-android-optimize.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;proguard-rules.pro&#39;</span>
        <span class="token punctuation">}</span>
        release <span class="token punctuation">{</span>
            minifyEnabled <span class="token boolean">false</span>
            proguardFiles <span class="token function">getDefaultProguardFile</span><span class="token punctuation">(</span><span class="token string">&#39;proguard-android-optimize.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;proguard-rules.pro&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

tasks<span class="token punctuation">.</span><span class="token function">withType</span><span class="token punctuation">(</span>org<span class="token punctuation">.</span>jetbrains<span class="token punctuation">.</span>kotlin<span class="token punctuation">.</span>gradle<span class="token punctuation">.</span>tasks<span class="token punctuation">.</span>KotlinCompile<span class="token punctuation">)</span><span class="token punctuation">.</span>all <span class="token punctuation">{</span>
    kotlinOptions <span class="token punctuation">{</span>
        jvmTarget <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.8&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

dependencies <span class="token punctuation">{</span>
    implementation <span class="token interpolation-string"><span class="token string">&quot;org.jetbrains.kotlin:kotlin-stdlib-jdk7:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">kotlin_version</span></span><span class="token string">&quot;</span></span>
    implementation <span class="token interpolation-string"><span class="token string">&quot;androidx.appcompat:appcompat:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">jetpack_appcompat_version</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br></div></div><h2 id="\u9A8C\u8BC1-firstclasstransformer" tabindex="-1"><a class="header-anchor" href="#\u9A8C\u8BC1-firstclasstransformer" aria-hidden="true">#</a> \u9A8C\u8BC1 <em>FirstClassTransformer</em></h2><p>\u5728 <em>Android</em> \u5DE5\u7A0B\u4E0B\uFF0C\u6267\u884C <em>assemble</em> \u4EFB\u52A1\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ ./gradlew assembleDebug
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u89C2\u5BDF\u63A7\u5236\u53F0\u7684\u6807\u51C6\u8F93\u51FA\uFF0C\u662F\u5426\u6709\u5982\u4E0B\u5185\u5BB9\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Transforming kotlinx/android/parcel/TypeParceler
Transforming androidx/appcompat/graphics/drawable/AnimatedStateListDrawableCompat$1
Transforming androidx/appcompat/app/ActionBar$NavigationMode
Transforming kotlinx/android/parcel/WriteWith
Transforming kotlinx/android/parcel/IgnoredOnParcel
Transforming kotlinx/android/parcel/RawValue
Transforming kotlinx/android/parcel/Parcelize
Transforming androidx/appcompat/app/ActionBar$DisplayOptions
Transforming kotlinx/android/extensions/LayoutContainer
Transforming androidx/appcompat/app/ActionBarDrawerToggle$Delegate
Transforming androidx/appcompat/app/ActionBar$TabListener
Transforming androidx/appcompat/app/ActionBar$OnMenuVisibilityListener
Transforming kotlin/jvm/internal/Ref$DoubleRef
......
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,10);function _(q,T){const p=t("ExternalLinkIcon");return o(),l(r,null,[u,s("p",null,[n("\u57FA\u4E8E "),b,n(" \u7684 "),m,n(" \u9700\u8981\u5728 "),k,n(" \u4E2D\u5F15\u5165 "),s("a",d,[n("booster-transform-asm"),e(p)]),n(" \u4F9D\u8D56\uFF1A")]),g,s("p",null,[n("\u57FA\u4E8E "),v,n(" \u7684 "),f,n(" \u9700\u8981\u5728 "),h,n(" \u4E2D\u5F15\u5165 "),s("a",x,[n("booster-transform-javassist"),e(p)]),n(" \u4F9D\u8D56\uFF1A")]),y],64)}var w=i(c,[["render",_]]);export{w as default};
