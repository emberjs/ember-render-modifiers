import Controller from '@ember/controller';

export default Controller.extend({
  name: 'Bob',

  update() {
    console.log(this.name);
  },

  clear() {
    this.set('name', null);
  },
});
