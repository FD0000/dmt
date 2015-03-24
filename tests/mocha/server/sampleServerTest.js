
if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        var expect = chai.expect;
        describe("Server initialization", function(){
            it("Should have a Meteor version defined", function(){
                chai.assert(Meteor.release);
            });

            it("Should have Meteor.methods defined", function(){
                expect(Meteor.methods).to.be.an('function');
            });

            it("Should initialise Router map", function(){
                expect(Router.map).to.be.an('function');
            });

            it('Should initialise Router admin controllers', function(){
                expect(AdminAccessController).to.be.an('function');
            });

            it('Should initialise Router user controllers', function(){
                expect(UserAccessController).to.be.an('function');
            });

            it('Should initialise Router configuration', function(){
                expect(Router.configure).to.be.an('function');
            });

            it('Should initialise collection objects', function(){
                expect(Devices).to.be.an('object');
                expect(Log).to.be.an('object');
                expect(Comments).to.be.an('object');
            });
        });

        describe("Methods functionality", function(){
            var testData = {
                assetNumber: 'Test-assetNumber',
                manufacturer: 'Test-manufacturer',
                model: 'Test-model',
                img: 'Test-img',
                description: 'Test-description',
                OSType: 'Test-ostype',
                OSVersion: 'Test-osver',
                deviceType: 'Test-devicetype',
                screenSize: 'Test-screensize',
                releaseYear: 'Test-release',
                status: 'available',
                bookedBy: 'empty',
                bookedOn: 'empty',
                bookedUntil: 'empty'
            };

            it('Should add Devices collection entry', function(){
                var execute = Meteor.call('addDeviceToCollection', testData);
                expect(execute).to.be.an('string');
                expect(execute).to.have.length.above(0);
            });

            var testLog = {
                userEmail: 'mocha@testing.com',
                logEntry: 'test-added',
                deviceManufacturer: 'Test-manufactorer',
                deviceModel: 'Test-model',
                timeStamp: new Date().getTime()
            };

            it('Should add a Log collection entry', function(){
                var execute = Meteor.call('insertLog', testLog);
                expect(execute).to.be.an('string');
                expect(execute).to.have.length.above(0);
            });
        });
    });
}
