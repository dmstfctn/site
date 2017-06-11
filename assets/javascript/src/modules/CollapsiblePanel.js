var $ = require('jquery');

var ID = 0;

var CollapsiblePanel = function( _ele ){
	this.$ele = $( _ele );
  this.ele = this.$ele.get(0);
	this.$trigger = this.$ele.find('.collapsible-panel--toggle');
	this.isOpen = ( $(this).hasClass('collapsed') ) ? true : false;
	console.log( 'PANEL IS ONPEN? ', this.isOpen );
	this.namespace = 'CollapsiblePanel-' + ID;
	ID++;

	console.log( 'new panel: ' + this.namespace );

	this.addListeners();
}

var proto = CollapsiblePanel.prototype;

proto.addListeners = function(){
	var that = this;

	this.$trigger.on( 'click.' + this.namespace, function(){
		that.toggle();
	});
}

proto.toggle = function(){
	if( this.isOpen ){
		console.log( 'close panel')
		this.close();
	} else {
		console.log( 'open panel')
		this.open();
	}
}

proto.open = function(){
	this.$ele.removeClass('collapsed');
	this.isOpen = true;
}

proto.close = function(){
	this.$ele.addClass('collapsed');
	this.isOpen = false;
}

this.destroy = function(){
	this.close();
	this.$trigger.off( 'click.' + this.namespace );
}

module.exports = CollapsiblePanel;
