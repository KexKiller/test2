var popupPanel = function(options){
	var DEFAULT_BUTTON = {
		text: "OK",
		onClick: function() {
			return true
		}
	};
	
	var popup = null;
	var deferred = $.Deferred();
	var popupToolbarItems = [];
	popup && $(".popup").remove();
	
	$.each(options.buttons || [DEFAULT_BUTTON], function() {
		popupToolbarItems.push({
			toolbar: "bottom",
			location: "center",
			widget: "dxButton",
			options: $.extend({}, this, {
				onClick: function(w) {
					hide(this._options.text)
				}
			})
		})
	});
	
	$popupContainer = $("<div />").addClass("popup").appendTo($("#popup"));
	
	popup = $popupContainer.dxPopup({
		width: options.width,
        height: options.height,
        showCloseButton: options.showCloseButton ? options.showCloseButton : false,
        contentTemplate: options.template,
        showTitle: true,
        title: options.title,
		showTitle: function() {
            var isTitle = void 0 === options.showTitle ? true : options.showTitle;
            return isTitle
        }(),
        visible: false,
        dragEnabled: true,
        toolbarItems: popupToolbarItems,
        closeOnOutsideClick: false,
        onHiding: function() { deferred.reject() }
	}).dxPopup("instance");
	
	function hide(value) {
		deferred.resolve(value);
		popup.hide().done(function() {
			popup.element().remove()
		})
	};
	
	function show() {
		popup.show();
		return deferred.promise()
	};
	
	return {
		show: show,
		hide: hide
	}
}

var alert = function(title, template, width) {
	return alertOption({ title: title, template: template, width: width });
};

var alertMesage = function(title, template, width) {
	return alert(title, $("<div>").addClass("dx-dialog-message").html(String(template)), width);
};

var alertOption = function(params) {
	return confirmOption($.extend({btnRVisible: false}, params));
};

var confirm = function(title, template, width) {
	return confirmOption({ title: title, template: template, width: width });
};

var confirmOption = function(params) {
	var dialogInstance, options = {
		title: params.title,
		width: params.width ? params.width : 250,
		height: params.height ? params.height : 'auto',
		template: params.template,
		buttons: [{
			text: params.btnL ? params.btnL : "Si",
			disabled: params.btnLDisabled ? params.btnLDisabled : false,
			onClick: function() {
				return true
			}
		}, {
			text: params.btnR ? params.btnR : "No",
			disabled: params.btnRDisabled ? params.btnRDisabled : false,
			visible: (params.btnRVisible != undefined) ? params.btnRVisible : true,
			onClick: function() {
				return false
			}
		}],
		showCloseButton: params.showCloseButton ? params.showCloseButton : false
	};
	dialogInstance = this.popupPanel(options);
	return dialogInstance.show()
};

ko.bindingHandlers.hidden = {
  update: function(element, valueAccessor) {
    ko.bindingHandlers.visible.update(element, function() {
      return !ko.utils.unwrapObservable(valueAccessor());
    });
  }
};

function ajaxData(data) {
	if (data == null || data == undefined) return undefined;
	
	var result = null;
	if (Array.isArray(data)) {
		result = [];
		data.forEach(function(item) {
			result.push(ajaxData(item));
		});
	} else if (typeof data === 'object') {
		result = data
		result.machine_id = getCookie('machine_id') ? getCookie('machine_id') : "0";
	}
	
	return result;
};