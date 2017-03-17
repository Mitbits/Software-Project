Template.reservationPage.events({
    'click .plus.icon.link' () {
        if(count.innerHTML >= 0) {
            document.getElementById("minus").className = "big minus icon link";
            count.innerHTML++;
        }
    },
    'click .minus.icon.link' () {
        let count = document.getElementById("count");
        if(count.innerHTML > 0) {
            document.getElementById("minus").className = "big minus icon link";
            count.innerHTML--;
        } else {
            document.getElementById("minus").className = "big disabled minus icon link";
        }
    },
});
