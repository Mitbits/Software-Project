Template.reservationPage.events({
    'click .plus.icon.link' () {
        maxCount = 4;
        if(count.innerHTML >= 0 && count.innerHTML < maxCount) {
            document.getElementById("minus").className = "big minus icon link";
            count.innerHTML++;
        }
        else {
            document.getElementById("plus").className = "big disabled plus icon link";
        }
    },
    'click .minus.icon.link' () {
        let count = document.getElementById("count");
        if(count.innerHTML > 0 && count.innerHTML <= maxCount) {
            document.getElementById("minus").className = "big minus icon link";
            document.getElementById("plus").className = "big plus icon link";
            count.innerHTML--;
        } else {
            document.getElementById("minus").className = "big disabled minus icon link";
        }
    },
});
