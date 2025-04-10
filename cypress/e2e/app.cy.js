describe('Navigation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('input[type="text"]').type('Wake up');
        cy.contains('Add').click();
        cy.get('.list__element--item').should('contain', 'Wake up');
        
        cy.get('input[type="text"]').type('Sleep more then 8h');
        cy.contains('Add').click();
        cy.get('.list__element--item').should('contain', 'Sleep more then 8h');
    });
    
    it('add few elements to the list', () => {
        cy.get('input[type="text"]').type('new task for today');
        cy.contains('Add').click();
        cy.get('.list__element--item').should('contain', 'new task for today');
        
        cy.get('input[type="text"]').type('Arrive to the grocery shop');
        cy.contains('Add').click();
        cy.get('.list__element--item').should('contain', 'Arrive to the grocery shop');
        
        cy.get('input[type="text"]').type('Cook the dish');
        cy.contains('Add').click();
        cy.get('.list__element--item').should('contain', 'Cook the dish');
        
        cy.get('input[type="text"]').type('Go to the postal office');
        cy.contains('Add').click();
        cy.get('.list__element--item').should('contain', 'Go to the postal office');
    })
    
    it('Strike the elements from the list', () => {
        cy.get('input[type="text"]').type('Cook the dish');
        cy.contains('Add').click();
        cy.get('.list__element--item').should('contain', 'Cook the dish');
        
        cy.contains('Sleep more then 8h').click();
        cy
          .should('have.css', 'text-decoration-line', 'line-through')
          .parent()
          .get('input[type="checkbox"]').should('be.checked')
        
        cy.contains('Cook the dish').click();
        cy
          .should('not.have.css', 'text-decoration-line', 'none')
          .parent()
          .get('input[type="checkbox"]').should('be.checked')
    })
    
    it('Delete a few elements', () => {
        cy.get('input[type="text"]').type('Cook the dish');
        cy.contains('Add').click();
        cy.get('.list__element--item').should('contain', 'Cook the dish');
        
        cy.get('input[type="text"]').type('Arrive to the grocery shop');
        cy.contains('Add').click();
        cy.get('.list__element--item').should('contain', 'Arrive to the grocery shop');
        
        cy.contains('Wake up')
          .parent()
          .contains('Delete').click();
        
        cy.contains('Sleep more then 8h')
          .parent()
          .contains('Delete').click();
        
        cy.get('.list__wrapper').should('not.contain', 'Sleep more then 8h');
        cy.get('.list__wrapper').should('not.contain', 'Wake up');
    })
    
    it('Update an element', () => {
        cy.get('input[type="text"]').type('Cook the dish');
        cy.contains('Add').click();
        cy.get('.list__element--item').should('contain', 'Cook the dish');
        
        cy.get('input[type="text"]').type('Arrive to the grocery shop');
        cy.contains('Add').click();
        cy.get('.list__element--item').should('contain', 'Arrive to the grocery shop');
        
        cy.contains('Wake up')
          .parent()
          .contains('Delete').click();
        
        cy.contains('Sleep more then 8h')
          .parent()
          .contains('Delete').click();
        
        cy.get('.list__wrapper').should('not.contain', 'Sleep more then 8h');
        cy.get('.list__wrapper').should('not.contain', 'Wake up');
    })
})
