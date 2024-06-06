Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
        cy.get('#firstName').type('Joao')
        cy.get('#lastName').type('Pedro')
        cy.get('#email').type('joaotesteqa@getnede.com')
        cy.get('#open-text-area').type('longTextTests')
        cy.contains('.button', 'Enviar').click()
})

