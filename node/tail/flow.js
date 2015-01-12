// basic control flow
// inspired by the excellent kuji library https://github.com/kubekhrm/kuji
// todo: add error handling
/*
tail.flow.graph({
  a: function (next) {
    next()
  },
  b: function (next) {
    next();
  },
  c: function (next) {  
    next();
  },
  d: runAfter(['a', 'b'], function (next) {
    next();
  }),
  e: runAfter(['d', 'c'], function (next) {
    next();
  })
}, function () {
  // This will be executed at the end of your graph
});
*/

var Task = function (graph, task) {
    var self = this;

    var _dependencies = [],
        _promises = [],
        _started = false;

    this.finished = false;

    this.isReadyToGo = function () {
        for (var i in _dependencies)
            if (!_dependencies[i].finished)
                return false;
        return true;
    };

    this.addDependency = function (dependency) {
        _dependencies.push(dependency);
        dependency.addPromise(self);
    };

    this.addPromise = function (promise) {
        _promises.push(promise);
    };

    // Create Next callback
    var next = function () {
        // Define task as finished
        self.finished = true;
        // Run all of its promises
        if (_promises.length > 0)
            for (var i in _promises)
                _promises[i].start();
        // If no promise, maybe graph has finished its tasks
        else
            graph.tryFinish();

    };

    this.start = function () {
        if (!_started && self.isReadyToGo()) {
            _started = true;
            // Run task and pass it the callback
            task(next);
        }
    };

};

var Graph = function () {

    var _nodes = [],
        _root = [],
        _finalCallback;

    this.addTask = function (name, task) {
        var node = new Task(this, task);

        // If task has no dependency add it to the graph root
        if (!task.dependencies || task.dependencies.length === 0)
            _root.push(node);
        // Else add each of its dependencies to the node
        else
            for (var i in task.dependencies)
                node.addDependency(_nodes[task.dependencies[i]]);
        _nodes[name] = node;
    };

    this.start = function () {
        // Start all tasks at root
        for (var i in _root)
            _root[i].start();
    };

    this.setFinalCallback = function (finalCallback) {
        _finalCallback = finalCallback;
    };

    this.tryFinish = function () {
        // Ensure there is a final callback
        if (!_finalCallback)
            return;
        // Check if all nodes have been executed
        for (var i in _nodes)
            if (!_nodes[i].finished)
                return;
            _finalCallback();
    };
};


var flow = {

    // Helper for adding dependencies to task
    runAfter: function (dependencies, task) {                        
        return task.dependencies = dependencies;
    },

    // Creates a graph from tasks array and run it
    graph: function (tasks, finalCallback) {
        var _graph = new Graph();

        // Add all tasks to graph
        for (var i in tasks)
            _graph.addTask(i, tasks[i]);

        if (finalCallback)
            _graph.setFinalCallback(finalCallback);

        _graph.start();
    },

    parallel: function () {
        if (arguments.length === 0) return;

        var tasks = Array.prototype.slice.call(arguments, 0);
        var _graph = new Graph();

        _graph.setFinalCallback(tasks.pop());

        // Add all tasks to graph
        for (var i in tasks) {            
            _graph.addTask(i, tasks[i]);
        }        

        _graph.start();
    },

    series: function () {
        if (arguments.length === 0) return;
        
        var tasks = Array.prototype.slice.call(arguments, 0);

        var _graph = new Graph();

        // Add all tasks to graph
        var previous = null;
        for (var i in tasks) {
            var task = tasks[i];
            // Set task dependency to previous task            
            if (previous)
                task.dependencies = [previous];

            _graph.addTask(i, task);
            previous = i;
        }
        _graph.start();
    }
};

module.exports = flow;