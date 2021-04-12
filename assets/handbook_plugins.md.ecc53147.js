import{o as n,c as s,a,b as t,t as e,d as p}from"./app.69edf3de.js";const o='{"title":"Plugins in Twind","description":"Learn how to write and use plugins in Twind.","frontmatter":{"title":"Plugins in Twind","editLink":true,"navbar":true,"sidebar":true,"head":[["meta",{"name":"description","content":"Learn how to write and use plugins in Twind."}],["meta",{"name":"keywords","content":"twind tailwind css-in-js"}]]},"headers":[{"level":2,"title":"Introduction","slug":"introduction"},{"level":2,"title":"Plugin as alias","slug":"plugin-as-alias"},{"level":2,"title":"Plugins without arguments","slug":"plugins-without-arguments"},{"level":2,"title":"Plugins with arguments","slug":"plugins-with-arguments"},{"level":3,"title":"Referencing the theme","slug":"referencing-the-theme"},{"level":2,"title":"Inline Plugins","slug":"inline-plugins"},{"level":2,"title":"Inject global styles","slug":"inject-global-styles"}],"relativePath":"handbook/plugins.md","lastUpdated":1618240322724}',c={},i={id:"frontmatter-title"},l=a("a",{class:"header-anchor",href:"#frontmatter-title","aria-hidden":"true"},"#",-1),u=p('<p>Components - start with utilities and extract them</p><p>Theming and customization lets you specify how core plugins and the compiler behave. This is usually ample for most use cases but sometimes more flexibility is required. Sometimes you might want to extend the abilities of the compiler. When this is the case then most likely you are going to need to write a plugin.</p><h2 id="introduction"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2><blockquote><p>❗ Note that currently the plugin API for Twind differs slightly to tailwind plugins</p></blockquote><p>Plugins make it possible to extend the compilers grammar by adding new directives or variants. Language extension like this is achieved by providing plugins as named functions during setup.</p><p>New plugins can be provided using the <code>plugins</code> property when calling the <code>setup</code> method.</p><p>Plugins are searched for by name using the longest prefix before a dash (<code>&quot;-&quot;&#39;</code>). The remaining parts (splitted by a dash) are provided as first argument to the plugin function. For example if the directive is <code>bg-gradient-to-t</code> the following order applies:</p><table><thead><tr><th>Plugin</th><th>Parts</th></tr></thead><tbody><tr><td><code>bg-gradient-to-t</code></td><td><code>[]</code></td></tr><tr><td><code>bg-gradient-to</code></td><td><code>[&quot;t&quot;]</code></td></tr><tr><td><code>bg-gradient</code></td><td><code>[&quot;to&quot;, &quot;t&quot;]</code></td></tr><tr><td><code>bg</code></td><td><code>[&quot;gradient&quot;, &quot;to&quot;, &quot;t&quot;]</code></td></tr></tbody></table><h2 id="plugin-as-alias"><a class="header-anchor" href="#plugin-as-alias" aria-hidden="true">#</a> Plugin as alias</h2><p>The simplest form of a plugin is one defines a list of tailwind rules to use – basically an alias for the rules:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> tw<span class="token punctuation">,</span> setup <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;twind&#39;</span>\n\n<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">{</span>\n    btn<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\n      py-2 px-4\n      font-semibold\n      rounded-lg shadow-md\n      focus:(outline-none ring(2 indigo-400 opacity-75))\n   </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n    <span class="token string">&#39;btn-indigo&#39;</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">btn bg-indigo(500 hover:700) text-white</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\ntw<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">btn</span><span class="token template-punctuation string">`</span></span>\n<span class="token comment">// =&gt; py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75</span>\n\ntw<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">btn-indigo</span><span class="token template-punctuation string">`</span></span>\n<span class="token comment">// =&gt; py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 bg-indigo-500 hover:bg-indigo-700 text-white</span>\n</code></pre></div><p>If you want to combine all CSS declarations of these rules into one class use <code>apply</code>:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> tw<span class="token punctuation">,</span> setup<span class="token punctuation">,</span> apply <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;twind&#39;</span>\n\n<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">{</span>\n    btn<span class="token operator">:</span> apply<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\n      py-2 px-4\n      font-semibold\n      rounded-lg shadow-md\n      focus:(outline-none ring(2 indigo-400 opacity-75))\n   </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\ntw<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">btn</span><span class="token template-punctuation string">`</span></span>\n<span class="token comment">// tw-XXXXX</span>\n</code></pre></div><h2 id="plugins-without-arguments"><a class="header-anchor" href="#plugins-without-arguments" aria-hidden="true">#</a> Plugins without arguments</h2><p>Another form of plugin is one that returns the literal CSS rules that the compiler should return in response to a single directive.</p><p>For example, say you wanted to take advantage of the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type" target="_blank" rel="noopener noreferrer">scroll-snap API</a> which isn&#39;t supported by tailwind currently.</p><p>You could create a simple plugin like so:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> setup <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;twind&#39;</span>\n\n<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&#39;scroll-snap-x&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string">&#39;scroll-snap-type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;x&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>The above code will result in the compiler returning <code>{ scroll-snap-type: x }</code> every time it encounters the directive <code>scroll-snap-x</code> within a set of rules.</p><p>If you are migrating existing CSS you can use the <code>css</code> helper:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> setup <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;twind&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;twind/css&#39;</span>\n\n<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&#39;scroll-snap-x&#39;</span><span class="token operator">:</span> css<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\n      scroll-snap-type: x;\n    </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><h2 id="plugins-with-arguments"><a class="header-anchor" href="#plugins-with-arguments" aria-hidden="true">#</a> Plugins with arguments</h2><p>The previous example is trivial to implement but it only accounts for one of the many valid scroll snap values in the CSS specification. It is possible to write out all the possible scroll-snap rules like this but it would be arduous and somewhat wasteful.</p><p>It is possible to generalize a plugins behavior by using a function:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> setup <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;twind&#39;</span>\n\n<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&#39;scroll-snap&#39;</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">parts</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">&#39;scroll-snap-type&#39;</span><span class="token operator">:</span> parts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>Plugins are passed three arguments:</p><ul><li><p><code>parts</code>: the directive split on &#39;-&#39; with the plugin name excluded</p></li><li><p><code>context</code>: an object providing access to several commonly used functions</p><ul><li><code>theme</code>: the currently configured theme that is being used by the compiler</li><li><code>tw</code>: the configured <code>tw</code> export</li><li><code>tag</code>: generate a unique value; this can be used to create marker classes like <code>group</code></li></ul></li><li><p><code>id</code>: the name of the plugin</p></li></ul><p>This means that the plugin above now covers more single part cases like <code>scroll-snap-x</code>, <code>scroll-snap-y</code> and <code>scroll-snap-none</code> etc. It is worth noting now that the whole of Twind is built upon this exact same premise, every rule outlined in the Tailwind docs has an equivalent plugin. We refer to these as <em>core plugins</em>.</p><p>The above example could be written using the <code>css</code> helper:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> setup <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;twind&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;twind/css&#39;</span>\n\n<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&#39;scroll-snap&#39;</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">parts</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>\n      css<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\n        scroll-snap-type: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>parts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;\n      </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><blockquote><p>Core plugins cannot be deleted but they can be overwritten</p></blockquote><p>If we wanted to take this one step further and cover all scroll-snap cases then we could do something like:</p><div class="language-js"><pre><code><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&#39;scroll-snap&#39;</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">parts</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">&#39;scroll-snap-type&#39;</span><span class="token operator">:</span> parts<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39; &#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>This would now work for multi-part rules like <code>scroll-snap-both-proximity</code> which would return <code>{ scroll-snap-type: both proximity; }</code> demonstrating how parts can be combined to produce output which adheres to whatever CSS specification they are trying to abstract over.</p><h3 id="referencing-the-theme"><a class="header-anchor" href="#referencing-the-theme" aria-hidden="true">#</a> Referencing the theme</h3><p>The second named argument passed to a plugin is the configured theme that is being used by the compiler. This is not always required but is useful in circumstances where you might want to provide a default or configurable set of values for a given directive.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> setup <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;twind&#39;</span>\n\n<span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  theme<span class="token operator">:</span> <span class="token punctuation">{</span>\n    scroll<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token constant">DEFAULT</span><span class="token operator">:</span> <span class="token string">&#39;both&#39;</span><span class="token punctuation">,</span>\n      proximity<span class="token operator">:</span> <span class="token string">&#39;both proximity&#39;</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&#39;scroll-snap&#39;</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">parts<span class="token punctuation">,</span> <span class="token punctuation">{</span> theme <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n      <span class="token string">&#39;scroll-snap-type&#39;</span><span class="token operator">:</span> <span class="token function">theme</span><span class="token punctuation">(</span><span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span> parts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>In the above example, the directive <code>scroll-snap</code> with no arguments with result in the CSS rule <code>{ scroll-snap-type: both }</code> being returned (using the <code>DEFUALT</code> value from the theme). The <code>theme</code> that gets passed to plugins isn&#39;t an object but rather a function that takes a path and attempts to return a value from that location in the theme.</p><p>Rules determining the theme functions behavior can be found in the <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">Tailwind documentation</a>.</p><h2 id="inline-plugins"><a class="header-anchor" href="#inline-plugins" aria-hidden="true">#</a> Inline Plugins</h2><p>The final kind of plugin is described as an inline plugin but is not strictly a plugin because it doesn&#39;t get defined up front in the setup function. They can be used as an escape hatch when writing out &quot;one off&quot; rules.</p><p>Sometimes you might find yourself wanting to write some arbitrary styles for an element. Some rule that isn&#39;t covered by Tailwind API but perhaps isn&#39;t general enough to warrant creating a real plugin for.</p><p>If you find yourself in this circumstance, use an inline plugin:</p><div class="language-js"><pre><code><span class="token function">tw</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token string">&#39;&amp;::before&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> content<span class="token operator">:</span> <span class="token string">&#39;&quot;🙁&quot;&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token string">&#39;&amp;::after&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> content<span class="token operator">:</span> <span class="token string">&#39;&quot;😊&quot;&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token comment">// =&gt; tw-xxxx</span>\n</code></pre></div><p>Essentially an inline plugin is a function that returns some CSS rules in object notation format. Here you can use the <code>&amp;</code> selector to target the current element much like in other CSS-in-JS libraries. In this way, it is possible to write styles that cannot be described using an inline style attribute alone; things like specific children selectors.</p><p>Furthermore any variants or groupings that are active when the plugin is called, will be respected by the return value. Meaning that you can scope inline plugins with responsive variants:</p><div class="language-js"><pre><code>tw<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\n  sm:hover:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    <span class="token string">&#39;&amp;::before&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> content<span class="token operator">:</span> <span class="token string">&#39;&quot;🙁&quot;&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token string">&#39;&amp;::after&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> content<span class="token operator">:</span> <span class="token string">&#39;&quot;😊&quot;&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n</span><span class="token template-punctuation string">`</span></span>\n<span class="token comment">// =&gt; sm:hover:tw-xxxx</span>\n</code></pre></div><p>In the above example, the before and after styles are only applied on small screens and when the user is hovering over the element.</p><blockquote><p><strong>Note</strong>: The above examples are for exploratory purposes. Consider using <a href="./css-in-twind.html">twind/css</a> for optimal performance.</p><div class="language-js"><pre><code>tw<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\n  sm:hover:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">css</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    <span class="token string">&#39;&amp;::before&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> content<span class="token operator">:</span> <span class="token string">&#39;&quot;🙁&quot;&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token string">&#39;&amp;::after&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> content<span class="token operator">:</span> <span class="token string">&#39;&quot;😊&quot;&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\n</span><span class="token template-punctuation string">`</span></span>\n<span class="token comment">// =&gt; sm:hover:tw-xxxx</span>\n</code></pre></div></blockquote><p>Additionally inline plugins allow to extract common definitions:</p><div class="language-js"><pre><code><span class="token keyword">const</span> <span class="token function-variable function">link</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> tw <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> tw<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">text-cyan-600 hover:text-cyan-700</span><span class="token template-punctuation string">`</span></span>\n\ntw<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">font-bold </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>link<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>\n<span class="token comment">// =&gt; font-bold text-cyan-600 hover:text-cyan-700</span>\n</code></pre></div><blockquote><p><strong>Note</strong>: Inline plugins must be idempotent and side-effect free.</p></blockquote><h2 id="inject-global-styles"><a class="header-anchor" href="#inject-global-styles" aria-hidden="true">#</a> Inject global styles</h2><p>If a plugin needs to define some global styles it can use the <code>:global</code> property which should contain an selectors object with css properties:</p><div class="language-js"><pre><code><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">{</span>\n    link<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&#39;:global&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        a<span class="token operator">:</span> <span class="token punctuation">{</span>\n          <span class="token comment">/* global styles for anchors */</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token comment">/* element styles */</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div>',55);c.render=function(p,o,c,r,k,d){return n(),s("div",null,[a("h1",i,[l,t(" "+e(p.$frontmatter.title),1)]),u])};export default c;export{o as __pageData};