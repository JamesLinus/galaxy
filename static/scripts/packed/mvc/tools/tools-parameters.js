define(["utils/utils","mvc/ui/ui-misc","mvc/tools/tools-select-content"],function(b,c,a){return Backbone.Model.extend({types:{text:"_fieldText",select:"_fieldSelect",data_column:"_fieldSelect",genomebuild:"_fieldSelect",data:"_fieldData",data_collection:"_fieldData",integer:"_fieldSlider","float":"_fieldSlider","boolean":"_fieldBoolean",drill_down:"_fieldDrilldown",hidden:"_fieldHidden",hidden_data:"_fieldHidden",baseurl:"_fieldHidden"},initialize:function(e,d){this.app=e},create:function(d){if(d.value===undefined){d.value=null}if(d.default_value===undefined){d.default_value=d.value}var f=null;var e=this.types[d.type];if(e&&typeof(this[e])==="function"){f=this[e].call(this,d)}if(!f){this.app.incompatible=true;if(d.options){f=this._fieldSelect(d)}else{f=this._fieldText(d)}console.debug("tools-form::_addRow() : Auto matched field type ("+d.type+").")}if(d.value!==undefined){f.value(d.value)}return f},_fieldData:function(d){if(!this.app.options.is_dynamic){d.info="Data input '"+d.name+"' ("+b.textify(d.extensions.toString())+")";d.value=null;return this._fieldHidden(d)}var e=this;return new a.View(this.app,{id:"field-"+d.id,extensions:d.extensions,optional:d.optional,multiple:d.multiple,type:d.type,data:d.options,onchange:function(){e.app.trigger("refresh")}})},_fieldSelect:function(d){if(!this.app.options.is_dynamic&&d.is_dynamic){return this._fieldText(d)}if(d.type=="data_column"){d.error_text="Missing columns in referenced dataset."}if(d.type=="genomebuild"){d.searchable=true}var f=[];for(var g in d.options){var h=d.options[g];f.push({label:h[0],value:h[1]})}var j=c.Select;switch(d.display){case"checkboxes":j=c.Checkbox;break;case"radio":j=c.Radio;break}var e=this;return new j.View({id:"field-"+d.id,data:f,error_text:d.error_text||"No options available",multiple:d.multiple,searchable:d.searchable,onchange:function(){e.app.trigger("refresh")}})},_fieldDrilldown:function(d){if(!this.app.options.is_dynamic&&d.is_dynamic){return this._fieldText(d)}var e=this;return new c.Drilldown.View({id:"field-"+d.id,data:d.options,display:d.display,onchange:function(){e.app.trigger("refresh")}})},_fieldText:function(d){if(d.options){d.area=d.multiple;if(!b.validate(d.value)){d.value=""}else{if(d.value instanceof Array){d.value=value.toString()}else{d.value=String(d.value).replace(/[\[\]'"\s]/g,"");if(d.multiple){d.value=d.value.replace(/,/g,"\n")}}}}var e=this;return new c.Input({id:"field-"+d.id,area:d.area,onchange:function(){e.app.trigger("refresh")}})},_fieldSlider:function(d){var e=this;return new c.Slider.View({id:"field-"+d.id,precise:d.type=="float",min:d.min,max:d.max,onchange:function(){e.app.trigger("refresh")}})},_fieldHidden:function(d){return new c.Hidden({id:"field-"+d.id,info:d.info})},_fieldBoolean:function(d){var e=this;return new c.RadioButton.View({id:"field-"+d.id,data:[{label:"Yes",value:"true"},{label:"No",value:"false"}],onchange:function(){e.app.trigger("refresh")}})}});return{View:View}});