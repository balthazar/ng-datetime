'use strict';

angular.module('ngDatetime', [])
	.directive('ngDatetime', function () {

		return {
			restrict: 'AE',
			replace : true,
			template:
			'<div class="well rounded-left">' +
				'<div class="input-append date">' +
					'<span class="add-on">' +
					'<i data-time-icon="icon-clock" data-date-icon="icon-calendar"></i>' +
					'</span>' +
					'<input data-format="dd/MM/yyyy hh:mm" type="text"></input>' +
				'</div>' +
			'</div>',
			scope   : {
				value: '='
			},
			link    : function (scope, element) {

				$('.well > div').datetimepicker({
					format: 'dd/MM/yyyy hh:mm',
					todayHighlight: true,
					pickSeconds: false
				})
				.on('changeDate', function (e) {
					scope.$apply(function(scope) {
						scope.value = e.localDate;
					});
				});

				var date = $('.well > div').data('datetimepicker');
				date.setLocalDate(new Date());

				scope.$watch('value', function (newVal, oldVal) {
					date.setLocalDate(newVal);
				});

				scope.$on('$destroy', function() {
					$('.bootstrap-datetimepicker-widget').remove();
				});

			}
		};
	});
