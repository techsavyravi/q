Template.uploadForm.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
    currentUpload: function () {
        return Template.instance().currentUpload.get();
    },
    uploadedFiles: function () {
        return Images.find();
    }
});

Template.uploadForm.events({
    'change #fileInput': function (e, template) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            // We upload only one file, in case
            // there was multiple files selected
            var whattoupload = $(e.currentTarget).attr("what");
            var file = e.currentTarget.files[0];
            if (file) {
                var uploadInstance = Images.insert({
                    file: file,
                    type: whattoupload,
                    streams: 'dynamic',
                    chunkSize: 'dynamic'
                }, false);

                uploadInstance.on('start', function () {
                    template.currentUpload.set(this);
                });

                uploadInstance.on('end', function (error, fileObj) {
                    if (error) {
                        window.alert('Error during upload: ' + error.reason);
                    } else {
                        // window.alert('File "' + fileObj.name + '" successfully uploaded');
                    }
                    template.currentUpload.set(false);
                });

                uploadInstance.start();
            }
        }
    },
    'click #btnReset': function () {
        swal({
            title: "The portal will be RESET. Are you sure?",
            text: "You will not be able to recover any files or report data rows, products, store data and reports. If you have not downloaded the reports download and save it now on your local computer!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, RESET it!",
            closeOnConfirm: false
        }, function () {
            Meteor.call('resetPortal', function (err, result) {
                if (err) {
                    swal("Can't Delete!", "There was some error, please check browser console.", "warning");
                } else {
                    console.log(result);
                    swal("PORTAL RESET!", "This ABC Portal has been reset.", "success");
                }
            });

        });
    }
});

Template.uploadedFiles.helpers({
    uploadedFiles: function () {
        return Images.find();
    },
    sizeinMB: function (size) {
        return Math.round((size / 1024 / 1024) * 100) / 100 + " MB";
    },
    getlink: function (url) {
        return url.replace("0.0.0.0:3000", "/");
    }
});
Template.uploadedFiles.events({
    'click #deleteFile': function (e, template) {
        fileid = $(e.currentTarget).attr('data');
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this file and all the data rows, products, store data and reports realted to this Excel File.!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {
            Meteor.call('file_delete', fileid, function (err) {
                if (err) {
                    swal("Can't Delete!", "There was some error, please check browser console.", "warning");
                } else {
                    swal("Deleted!", "Your file has been deleted.", "success");
                }
            });

        });
    },
    'click #btnReset': function () {
        swal({
            title: "The portal will be RESET. Are you sure?",
            text: "You will not be able to recover any files or report data rows, products, store data and reports. If you have not downloaded the reports download and save it now on your local computer!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, RESET it!",
            closeOnConfirm: false
        }, function () {
            Meteor.call('resetPortal', function (err, result) {
                if (err) {
                    swal("Can't Delete!", "There was some error, please check browser console.", "warning");
                } else {
                    console.log(result);
                    swal("PORTAL RESET!", "This ABC Portal has been reset.", "success");
                }
            });

        });
    }
})
