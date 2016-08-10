/* simple markdown parser */
/* md2html */

function md2html(md){
    /* regex patterns */
    var newline_pattern = /\n/gim;
    var header_pattern1 = /^(#{1,6}) (.+)(\n|\r)/gim;  // <h1> -> <h6>
    var header_pattern2 = /^(.+)(\n|\r)(=+)(\n|\r)/gim; // <h1>
    var header_pattern3 = /^(.+)(\n|\r)(-+)(\n|\r)/gim; // <h2>
    var header_fix = /(\<\/h[1-6]\>)(\r|\n|\r\n)?\<br\>/gim;
    var bold_pattern1 = /\*{2}(.+)\*{2}/gim; // <b>
    var bold_pattern2 = /\_{2}(.+)\_{2}/gim;  // <b>
    var italic_pattern1 = /\_(.+)\_/gim; // <i>
    var italic_pattern2 = /\*(.+)\*/gim; // <i>
    var striketrough_pattern = /\~{2}(.+)\~{2}/gim; // <del>
    var ul_pattern = /[\*|\+|-] (.+)/gim; // <ul><li></ul>
    var a_pattern1 = /\[(.+)\]\((.+)\)/gim; // <a>
    var a_pattern2 = /\[(.+)\]\((.+) \"(.+)\"\)/gim; // <a>
    var a_pattern3 = /\[(.+)\]/gim; // <a>
    //var a_pattern4 = /\<(.+)\>/gim;
    var source_pattern1 = /\`{3}(\S+)([\s\S]*)\`{3}/gim;
    
    /* links */
    /*md = md.replace(a_pattern4, function(match, url){
        return '<a href="' + url + '">' + url + '</a>';
    });*/
    md = md.replace(a_pattern1, function(match, title, url){
        return '<a href="' + url + '">' + title + '</a>';
    });
    md = md.replace(a_pattern2, function(match, title, url, tooltip){
        return '<a href="' + url + '" title="' + tooltip + '">' + title + '</a>';
    });
    md = md.replace(a_pattern3, function(match, url){
        return '<a href="' + url + '">' + url + '</a>';
    });

    /* headers */
    md = md.replace(header_pattern1, function(match, size, str){
        return '<h' + size.length + '>' + str + '</h' + size.length + '>';
    });
    md = md.replace(header_pattern2, function(match, str, _, size, __){
        if(size.length === str.length){
            return '<h1>' + str + '</h1>';
        }else{
            return match;
        }
    });
    md = md.replace(header_pattern3, function(match, str, _, size, __){
        if(size.length === str.length){
            return '<h2>' + str + '</h2>';
        }else{
            return match;
        }
    });
    
    /* bold */
    md = md.replace(bold_pattern1, function(match, str){
        return '<b>' + str + '</b>';
    });
    md = md.replace(bold_pattern2, function(match, str){
        return '<b>' + str + '</b>';
    });
    
    /* italic */
    md = md.replace(italic_pattern1, function(match, str){
        return '<i>' + str + '</i>';
    });
    md = md.replace(italic_pattern2, function(match, str){
        return '<i>' + str + '</i>';
    });
    
    /* striketrough */
    md = md.replace(striketrough_pattern, function(match, str){
        return '<del>' + str + '</del>';
    });
        
    /* source */
    md = md.replace(source_pattern1, function(match, lang, src){
        return '<pre title="' + lang + '">' + src + '</pre>';
    });
    
    md = md.replace(header_fix, function(match, header){
        return header;
    });
    
    /* lists */
    md = md.replace(ul_pattern, function(match, str){
        return '<li>' + str + '</li>';
    });

    /* newline */
    md = md.replace(newline_pattern, function(match, str){
        return '<br>';
    });

    return md;
}

if(typeof module !== 'undefined' && module.exports){
    exports.md2html = md2html;
}