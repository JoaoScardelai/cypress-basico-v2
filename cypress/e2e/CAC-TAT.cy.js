/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Lorem ipsum rhoncus accumsan pharetra consectetur sodales dictumst a urna, hac elit gravida ac accumsan luctus primis. id integer consequat accumsan placerat interdum tristique at sagittis, duis ornare torquent faucibus porta ac donec sodales, quis scelerisque sed donec iaculis amet aenean. sit vehicula fringilla dolor ligula non dapibus laoreet neque, tincidunt platea rhoncus fusce interdum porta nibh, morbi venenatis volutpat gravida vivamus commodo urna. convallis facilisis suscipit nisl maecenas eget luctus auctor non ut turpis primis commodo, tellus auctor ad venenatis at nostra gravida vulputate convallis congue aenean. faucibus mattis amet velit pulvinar eleifend faucibus pulvinar interdum, conubia morbi magna habitasse vestibulum id lectus ut, cursus etiam bibendum egestas eleifend potenti convallis. Cursus curabitur interdum habitant cubilia torquent curabitur etiam proin vehicula est, tempor nisl ornare rhoncus dapibus id nunc senectus curabitur nullam, lorem integer morbi ultrices nisi risus nibh litora fringilla. maecenas inceptos suspendisse vestibulum quisque pharetra laoreet per, elit suscipit fames fringilla semper erat auctor massa, hac lorem vitae blandit nibh convallis. conubia posuere vitae curabitur velit nunc leo feugiat maecenas etiam tristique viverra, magna torquent id etiam nunc aenean suscipit egestas malesuada tristique amet et, praesent iaculis erat metus nisl imperdiet aptent odio nostra quam. dolor fermentum mattis facilisis morbi consequat et curabitur rhoncus, aptent curae ullamcorper rutrum elementum facilisis hac, ac porttitor enim curabitur felis porttitor facilisis.'
        cy.get('#firstName').type('Joao')
        cy.get('#lastName').type('Pedro')
        cy.get('#email').type('joaotesteqa@getnede.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('.button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensgem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Joao')
        cy.get('#lastName').type('Pedro')
        cy.get('#email').type('joaotesteqagetnede.br')
        cy.get('#open-text-area').type('Testes QA Automatizado')
        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não númerico', function(){
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Joao')
        cy.get('#lastName').type('Pedro')
        cy.get('#email').type('joaotesteqa@getnede.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Testes QA Automatizado')
        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Joao')
            .should('have.value','Joao')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Pedro')
            .should('have.value','Pedro')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('joaotesteqa@getnede.com')
            .should('have.value','joaotesteqa@getnede.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('123456789')
            .should('have.value','123456789')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select(4)
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
         .should('have.length', 3)
         .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
         })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('input[type="checkbox"][value="phone"]').check()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
})
