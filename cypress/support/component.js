import '@cypress/code-coverage/support';
import './commands';
import '../../src/index.css';
import '@cypress/code-coverage/support';
import { mount } from 'cypress/react';
Cypress.Commands.add('mount', mount);
