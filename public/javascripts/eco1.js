$(function() {

    function getAiRow(name, ai, prefix = "Eco1"){
        // const tr = document.createElement('tr');
        // $('<td>' , { text: name }).appendTo(tr);
        // $('<td>' , { text: ai.description }).appendTo(tr);
        // $('<td>' , { text: ai.units }).appendTo(tr);
        // $('<td>' , { id : name,  text: 'NaN' }).appendTo(tr);
        // return tr;
        return $('<tr>', {
            append : $('<td>' , { text: name })
            .add($('<td>' , { text: ai.description , "class": "aiLabel" }))
            .add($('<td>' , { text: ai.units }))
            .add($('<td>' , { id : `${prefix}_${name}`,  text: 'NaN', "class" : "value"  }))
        })           
    };

    console.log("start");

                   // var socket = io.connect('http://95.158.47.15:3001');
                   var socket = io.connect();
                   var username = "testuser" + (Math.random * 10000.0).toFixed(3);
                  socket.emit('little_newbie', username);
                   socket.on('message', function(message) {
                       console.log('The server has a message for you: ' + message);
                       //alert('The server has a message for you: ' + message);
                   });

    const ECO1_MESSAGE_BORDER = 48;
    
    $.getJSON('data/ais.json',data => {

 //       for (ai in data.eco2) {
 //           $('#dataEco2').append(getAiRow(ai, data.eco2[ai], "Eco2"));
 //       }
        
        for (ai in data.eco1) {
            $('#dataEco1').append(getAiRow(ai, data.eco1[ai], "Eco1"));
        }

        socket.on('newdata', function(message) {
            const dataM340 = JSON.parse(message);

            //console.log(data.parameters);
            try {
                data.parameters.eco1.forEach(el => {
                    const elName ="#Eco1_" + el;
                    $(elName).text(dataM340[ECO1_MESSAGE_BORDER - data.eco1[el].index]);
                });               
            } catch (error) {
                console.log(error.message);
            }
        });
        /**
         *                     //  document.getElementById('Eco1_LastDayW38').innerText = dataM340[48];
                                document.getElementById('Eco1_T_10').innerText = dataM340[47];
                                document.getElementById('Eco1_P_22').innerText = dataM340[46];
                                document.getElementById('Eco1_P_21').innerText = dataM340[45];
                                document.getElementById('Eco1_P_34').innerText = dataM340[44];
                                document.getElementById('Eco1_T_41').innerText = dataM340[43];
                                document.getElementById('Eco1_T_42').innerText = dataM340[42];
                                document.getElementById('Eco1_P_36').innerText = dataM340[41];
                                document.getElementById('Eco1_W_38').innerText = dataM340[40];
                                document.getElementById('Eco1_Q_39').innerText = dataM340[39];
                                document.getElementById('Eco1_EI_86').innerText = dataM340[38];
                                document.getElementById('Eco1_P_19').innerText = dataM340[37];
                                document.getElementById('Eco1_EI_82').innerText = dataM340[36];
         */
    });
});
