/*
 * copyright BraDypUS 
 */
var search={init:function(method,tb,fast_string_or_recent_limit){switch(method){case'advanced':search.advanced(tb);break;case'sqlExpert':search.sqlExpert(tb);break;case'mostRecent':search.mostRecent((fast_string_or_recent_limit?fast_string_or_recent_limit:10),tb);break;case'all':search.all(tb);break;case'fast':search.fast(fast_string_or_recent_limit,tb);break;}},fast:function(string,tb){api.showResults(tb,'type=fast&string='+encodeURI(string),core.tr('fast_search'));},all:function(tb){api.showResults(tb,'type=all',core.tr('show_all')+' ('+tb+')');},mostRecent:function(nr,tb){api.showResults(tb,'type=recent&limit='+nr,core.tr('most_recent_records')+' ('+tb+')');},advanced:function(tb){core.open({obj:'search_ctrl',method:'advancedGUI',param:{tb:tb},title:core.tr('advanced_search')+' ('+tb+')',});},sqlExpert:function(tb){core.open({obj:'search_ctrl',method:'expertGUI',param:{tb:tb},title:core.tr('sql_expert_search')+' ('+tb+')'});},test:function(type,tb,post_data){post_data+='&tb='+tb+'&type='+type;core.getJSON('search_ctrl','test',false,post_data,function(data){core.message(data.verbose,data.status);});},getValues:function(fieldset,destroy){var fld=fieldset.find('select.fld'),input=fieldset.find('input.value')
if(destroy=='destroy'){input.attr('id',false);input.next('datalist').remove();enhance.combobox(input,true);return;}else{var datalist=$('<datalist />'),uid='uid'+Date.now();if(fld.val()){core.getJSON('search_ctrl','getUsedValues',{tb:fld.val().split(':')[0],fld:fld.val().split(':')[1]},false,function(data){$.each(data,function(i,val){datalist.append('<option>'+val+'</option>');});datalist.insertAfter(input)
input.attr('id',uid);datalist.attr('for',uid);enhance.combobox(input);});}}}};