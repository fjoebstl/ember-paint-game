import DS from 'ember-data';
import { computed } from '@ember/object';

const TEMPLATES = [
  ["white","white","white","white","white","white","white","white","white","white","white","black","black","black","black","black","black","black","black","white","white","black","red","black","green","black","purple","black","orange","white","white","black","red","black","green","black","purple","black","orange","white","white","black","red","black","green","black","purple","black","orange","white","white","black","red","black","green","black","purple","black","orange","white","white","black","red","black","green","black","purple","black","orange","white","white","black","red","black","green","black","purple","black","orange","white","white","black","black","black","black","black","black","black","black","white","white","white","white","white","white","white","white","white","white","white"],
  ["white","white","green","green","green","green","green","green","white","white","green","green","green","orange","green","orange","orange","green","white","white","green","orange","green","green","orange","orange","green","orange","green","white","green","orange","green","green","orange","green","green","orange","green","white","green","green","orange","green","orange","green","orange","green","green","white","white","green","green","orange","orange","orange","green","green","white","white","white","white","white","white","orange","orange","white","white","white","white","white","white","white","white","orange","orange","white","white","white","white","white","white","white","orange","orange","orange","orange","white","white","white","green","green","green","green","green","green","green","green","green","green"],
  ["white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","blue","white","white","white","white","blue","white","white","blue","blue","blue","blue","blue","white","blue","purple","white","blue","blue","white","blue","blue","blue","blue","blue","blue","white","blue","blue","blue","blue","blue","blue","blue","blue","purple","white","white","blue","blue","blue","blue","blue","white","blue","blue","white","white","white","white","white","blue","white","white","white","blue","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white"]
]

export default DS.Model.extend({
  templatePicture: DS.belongsTo('picture', { async: false }),
  playerPicture: DS.belongsTo('picture', { async: false }),

  init() {
    this._super(...arguments);

    this.set('templatePicture', this.store.createRecord('picture'));
    this.set('playerPicture', this.store.createRecord('picture'));

    this.pickRandomTemplate();
  },

  correctCellCount: computed('templatePicture.cells.@each{color}', 'playerPicture.cells.@each.{color}', function() {
    let count = 0;
    for (let i = 0; i < this.templatePicture.cells.length; i++) {
      if (this.templatePicture.cells.objectAt(i).color === this.playerPicture.cells.objectAt(i).color)
      {
        count++;
      }
    }

    return count;
  }),

  isComplete: computed.equal('correctCellCount', 100),

  pickRandomTemplate() {
    let randomTemplate = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
    this.templatePicture.load(randomTemplate);
    this.playerPicture.clear();
  }
});
