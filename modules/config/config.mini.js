/*
 * copyright BraDypUS 
 */
var config={init:function(){core.open({title:core.tr('sys_config'),obj:'config_ctrl',method:'home',});},validateApp:(uid)=>{core.getHTML('config_ctrl','validate_app',false,false,html=>{$('#'+uid+' .edit-column').html(html);$('#'+uid+' .field-list-column').html('').removeClass('col-sm-3');})},viewAppProperties:(uid)=>{$.get(`./?obj=config_ctrl&method=app_properties`,html=>{$('#'+uid+' .edit-column').html(html);$('#'+uid+' .field-list-column').html('').removeClass('col-sm-3');})},viewTbproperties:function(tb,uid){core.getHTML('config_ctrl','table_properties',tb?{tb:tb}:false,false,html=>{$('#'+uid+' .edit-column').html(html);$('#'+uid+' .field-list-column').html('').removeClass('col-sm-3');})},viewFldList:function(tb,uid){$.get(`./?obj=config_ctrl&method=fld_list&tb=${tb}`,html=>{$('#'+uid+' .field-list-column').html(html);$('#'+uid+' .field-list-column').addClass('col-sm-3');$('#'+uid+' .edit-column').html('');})},viewFldPropertied:function(tb,fld,thisel){const toEl=$(thisel).parents('.main').children('.edit-column');$.get(`./?obj=config_ctrl&method=field_properties&tb=${tb}&fld=${fld}`,html=>{toEl.html(html);})},saveTbData:function(form,tb){core.getJSON('config_ctrl','save_tb_data',false,form.serializeArray(),function(data){core.message(data.text,data.status);if(data.status==='success'){config.viewTbproperties(tb,$('div.active .config_container').attr('id'));}});},addNewTb:function(form){core.getJSON('config_ctrl','add_new_tb',false,form.serializeArray(),function(data){core.message(data.text,data.status);if(data.status==='success'){layout.tabs.reloadActive();setTimeout(()=>{config.viewTbproperties(data.tb,$('div.active .config_container').attr('id'));},500);}});},saveFldProperties:(form,tb,fld)=>{core.getJSON('config_ctrl','save_fld_properties',false,form.serializeArray(),function(data){core.message(data.text,data.status);if(data.status=='success'){config.viewFldPropertied(tb,fld,form);}});},saveAppProperties:(form)=>{core.getJSON('config_ctrl','save_app_properties',false,form.serializeArray(),function(data){core.message(data.text,data.status);});},deleteTb:tb=>{core.getJSON('config_ctrl','delete_tb',{tb:tb},false,data=>{core.message(data.text,data.status);layout.tabs.reloadActive();})}};