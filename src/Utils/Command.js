module.exports = class Command {

    constructor(command, closure, triggers) {
        this.command = command
        this.closure = closure;
        this.triggers = triggers;
    }

    toRegex() {
        // The command matching code is a modified version of Backbone.Router by Jeremy Ashkenas, under the MIT license.
        var optionalParam = /\s*\((.*?)\)\s*/g;
        var optionalRegex = /(\(\?:[^)]+\))\?/g;
        var namedParam = /(\(\?)?:\w+/g;
        var splatParam = /\*\w+/g;
        var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#]/g;
        var commandToRegExp = function (command) {
            command = command.replace(escapeRegExp, '\\$&')
                .replace(optionalParam, '(?:$1)?')
                .replace(namedParam, function (match, optional) {
                    return optional ? match : '([^\\s]+)';
                })
                .replace(splatParam, '(.*?)')
                .replace(optionalRegex, '\\s*$1?\\s*');
            return new RegExp(command, 'i');
        };
        return commandToRegExp(this.command);
    }
}
