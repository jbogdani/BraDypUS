/*
 * copyright BraDypUS 
 * Created: 1436095206.7222
*/
var preview_flds={init:function(){core.open({obj:'preview_flds_ctrl',method:'showForm',title:core.tr('preview_flds'),buttons:[{text:core.tr('save'),addclass:'btn-primary',click:function(){$('#modal form').submit();}},{text:core.tr('default_values'),addclass:'btn-warning',click:function(){$('#modal form input[type="checkbox"]').attr('checked',false);$('#modal form').submit();}},{text:core.tr('close'),action:'close'}]},'modal');}};