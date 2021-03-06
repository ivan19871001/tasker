;(function(TA, Backbone, Marionette, $, _) {
    "use strict";

    TA.module('Screens.Tasks', function(Mod, App, Backbone, Marionette, $, _) {

        var TasksLayout = Marionette.Layout.extend({
            template: 'Screens/Tasks/Tasks',
            regions: {
                addTask: '.add-task-region',
                tasks: '.tasks-region'
            },
            onRender: function() {
                var self = this;

                App.request('tasks').done(function(tasksCollection) {
                    var taskForm = new Mod.AddTaskForm();
                    self.addTask.show(taskForm);

                    var tasks = new Mod.TasksView({collection: tasksCollection});
                    self.tasks.show(tasks);
                });
            }
        });

        Mod.TasksLayout = TasksLayout;

        Mod.addInitializer(function(opts) {
            App.execute('registerScreen', {
                position: 3,
                screenKey: 'tasks',
                iconClass: 'fa-tasks',
                anchorText: 'Tasks',
                initializer: function(screen) {
                    screen.show(new TasksLayout());
                }
            });
        });
    });

})(TA, Backbone, Marionette, $, _);