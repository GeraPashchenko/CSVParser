module.exports.jsonToCSV = (usersObjs)=>{
    let head = "UserName, FirstName, LastName, Age";
    let fileContent = head;

    for(let i = 0; i < usersObjs.length; i++){
        let userString = `${usersObjs[i]["UserName"]}, ${usersObjs[i]["FirstName"]}, ${usersObjs[i]["LastName"]}, ${usersObjs[i]["Age"]}`
        fileContent += '\n' + userString ;
    }

    return fileContent;
}