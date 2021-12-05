function makeFriendsList(friends) {
  let ul_element = document.createElement("ul")

  friends.forEach(item => ul_element.innerHTML += `<li>${item.firstName} ${item.lastName}</li>`);
 
  return ul_element
}
