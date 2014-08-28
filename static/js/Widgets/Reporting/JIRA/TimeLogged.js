;(function(TA, Backbone, Marionette, $, _) {
    "use strict";

    TA.module('Widgets.Reporting.JIRA.TimeLogged', function(Mod, App, Backbone, Marionette, $, _) {

        var WEEK = 60 * 60 * 25; // 40 hr work week
        var colors = App.Texts.get('colors');

        var TimeLoggedThisWeekWidget = Marionette.ItemView.extend({
            template: 'Widgets/Reporting/JIRA/TimeLoggedWeek',
            className: 'widget time-tracked-weekly',
            ui: {
                $canvas: 'canvas'
            },
            initialize: function(opts) {

                this.collection = opts.collection;

                var timetracked = 0;

                this.collection.each(function(m) {
                    timetracked += m.get('count');
                });

                this.model.set('tracked', timetracked);
                this.model.set('untracked', WEEK - timetracked);

                var time = App.DateTime.parseSeconds(timetracked);
                this.model.set('hours', time.hour);
                this.model.set('minutes', time.minute);
                this.model.set('seconds', time.second);

            },
            onRender: function() {
                var self = this;

                var data = [
                    {value: this.model.get('tracked'), color: colors.green, label: 'Time Tracked'},
                    {value: this.model.get('untracked'), color: colors.red, label: 'Time Not Tracked'}
                ];
                var ctx = this.ui.$canvas.get(0).getContext('2d');

                this.chart = new Chart(ctx).Doughnut(data, _({
                    segmentShowStroke : false,
                    percentageInnerCutout : 45,
                }).extend(App.Config.get('chartjs')));
            }
        });

        Mod.get = function(opts) {
            return new TimeLoggedThisWeekWidget(opts);
        };
    });
})(TA, Backbone, Marionette, jQuery, _);