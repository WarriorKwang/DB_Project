import { mergeAttributes, Node } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-2';

import RadioSelect from './ComponentRadioSelect.vue';
import DropdownSelect from './ComponentDropdownSelect.vue';
import Editable from './ComponentEditable.vue';
import ComponentTagHighlight from './ComponentTagHighlight.vue';

export const radioSelect = Node.create({
  user_name: 'RadioSelect',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
      na: {
        default: 1,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'radio-select',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['radio-select', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(RadioSelect);
  },
});

export const dropdownSelect = Node.create({
  user_name: 'dropdownSelect',

  group: 'block',

  atom: true,

  parseHTML() {
    return [
      {
        tag: 'dropdown-select',
      },
    ];
  },

  addAttributes() {
    return {
      options: {
        default: [
          {
            value: '양성',
            label: '양성',
          },
          {
            value: '음성',
            label: '음성',
          },
        ],
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['dropdown-select', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(DropdownSelect);
  },
});

export const editable = Node.create({
  user_name: 'Editable',

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'editable',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['editable', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return VueNodeViewRenderer(Editable);
  },
});

export const componentTagHighlight = Node.create({
  user_name: 'ComponentTagHighlight',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      text: {
        default: '',
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'tag-highlight',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['tag-highlight', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(ComponentTagHighlight);
  },
});