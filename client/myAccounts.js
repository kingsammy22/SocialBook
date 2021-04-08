Template.myAccounts.helpers({
    theProfiles(){
        return profilesdb.find();
    }
});

Template.myAccounts.events({
    'click .js-delete'(event){
        let myID = this._id;
        let myDoc = event.target.parentNode.parentNode.parentNode;
        $(myDoc).fadeOut( "slow", function() {
            // Delete document permanently
            profilesdb.remove({_id: myID});
          });
        console.log("deleting", myID);
    }
});