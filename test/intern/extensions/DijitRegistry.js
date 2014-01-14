define([
	'intern!tdd',
	'intern/chai!assert',
	'dojo/_base/declare',
	'dgrid/OnDemandGrid',
	'dgrid/extensions/DijitRegistry',
	'dijit/registry',
	'dijit/form/TextBox',
	'dgrid/editor',
	'dgrid/test/data/base',
	'dojo/domReady!'
], function (test, assert, declare, Grid, DijitRegistryExt, registry, TextBox, editor, testStore) {

	var grid,
		RegistryGrid = declare([Grid, DijitRegistryExt]);


	test.suite('DijitRegistry', function () {

		test.before(function () {
			grid = new RegistryGrid({
				store: testStore,
				columns: {
					col1: editor({name: 'Column 1', editorArgs: {
						destroy: function () {
							this.inherited('destroy', arguments);
						},
						postCreate: function () {
							this.inherited('postCreate', arguments);
						}
					}}, TextBox),
					col3: 'Column 3',
					col4: 'Column 4',
					col5: 'Column 5'
				}
			});
			document.body.appendChild(grid.domNode);
			grid.startup();
		});

		test.test('test create', function () {
			assert(registry.length > 1, 'registry should contain dijits');
			grid.destroy();
		});

		test.test('test destroy', function () {
			grid.destroy();
			assert(registry.length === 0, 'registry should be empty after destroy');
		});
	});
});
