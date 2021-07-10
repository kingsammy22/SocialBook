Template.myAccounts.helpers({
    theProfiles(){
        if (Session.get("filter") === "All")
          return profilesdb.find({}, {limit: Session.get("profLimit")});
        return profilesdb.find({"pGen": Session.get("filter")} , {limit: Session.get("profLimit")});
    }
});

Template.myAccounts.events({
    'click .js-delete'(event){
        let myID = this._id;
        $("#confirmID").val(myID);
        $('#confirmModal').modal('show');
    },
    
    'click .js-confirmDel'(event){
        let delID = $("#confirmID").val();
        $('#confirmModal').modal('hide');
        $("#"+delID).fadeOut( "slow", function(){
            profilesdb.remove({_id: delID});
        });
        
    },

    'click .js-edit'(event){
        let myID = this._id;
        $("#editID").val(myID);
        let imgPath = this.pPic;
        let fname = this.pFirst;
        let lname = this.pLast;
        let age = this.pAge;
        let gender = this.pGen;
        document.getElementById("editImg").src = imgPath;
       $('#editPic').val(imgPath);
        $('#editfirstName').val(fname);
        $('#editlastName').val(lname);
       $('#editage').val(age);
        $('#editModal').modal('show');
        let genRadio = $('#editModal input[name="genderRadio"]');
        if (gender === "male")
         genRadio.filter('[value=male]').prop('checked', true);
        else
        genRadio.filter('[value=female]').prop('checked', true);

    },
    'click .js-saveEdit'(event){
        let editID = $("#editID").val();
        let imgPath = $('#editPic').val();
        let fname = $('#editfirstName').val();
        let lname = $('#editlastName').val();
       let age = $('#editage').val();
       let gender = $('#editModal input[name="genderRadio"]:checked').val();
       $('#editModal').modal('hide');
       profilesdb.update({_id: editID},
            {$set:{
                'pPic': imgPath,
                'pFirst': fname,
                'pLast': lname,
                'pAge': age,
                'pGen': gender

            }}
        );

    }
});