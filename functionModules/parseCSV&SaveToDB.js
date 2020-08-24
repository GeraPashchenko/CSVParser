module.exports.parseSave = (usersArr, UserModel) => {

    //make arrs from string
    for (let i = 0; i < usersArr.length; i++) {
        if (usersArr[i] !== '') {
            usersArr[i] = usersArr[i].replace(/["]+/g, '');
            usersArr[i] = usersArr[i].split(', ');
        } else {
            usersArr.pop(usersArr[i]);
        }
    }

    // save users to bd
    for (let i = 1; i < usersArr.length; i++) {

        let user = new UserModel(
            {
                UserName: usersArr[i][0],
                FirstName: usersArr[i][1],
                LastName: usersArr[i][2],
                Age: usersArr[i][3]
            });

        // find same users
        UserModel.find({
            UserName: usersArr[i][0],
            FirstName: usersArr[i][1],
            LastName: usersArr[i][2],
            Age: usersArr[i][3]
        }, (err, doc) => {

            if (err) return console.log(err);

            // if there are no overlap -> save new user in the db
            if (!doc.length) {
                user.save((err) => {
                    if (err) return console.log(err);
                })
            }
        })

    }
}