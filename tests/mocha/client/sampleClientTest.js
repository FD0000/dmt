if(Meteor.isClient){
    if (!(typeof MochaWeb === 'undefined')){
        MochaWeb.testOnly(function(){

            var expect = chai.expect;

            describe("Client initialisation", function(){
                it('Initialise utility functions', function(){
                    expect(validateDataObject).to.be.an('function');
                    expect(validateRegister).to.be.an('function');
                });
            });

            describe('Template initialisation', function(){
                var temp = [
                    'home', 'deviceGrid', 'mainLayout', 'bookedDeviceGrid',
                    'admin', 'bookedByMe', 'logs', 'users', 'feedback'
                ];
                temp.forEach(function(item) {
                    it('Initialise template: ' + item, function() {
                        expect(Template[item]).to.be.an('object');
                    });
                    it('Initialise Template.'+ item +' helpers', function(){
                        expect(Template[item].helpers).to.be.an('function');
                    })
                });
            });
        });
    }
}
