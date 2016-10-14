// tiny CSS layout "debugger"
// from https://gist.github.com/addyosmani/fd3999ea7fce242756b1
// puts random color border around each element
[].forEach.call($$("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})
