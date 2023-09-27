function getIPInfo() {
    fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then((data) => {
        const myIp = data.ip;

        document
          .getElementById("searchButton")
          .addEventListener("click", function () {
            const search = document.getElementById("search").value;

            if (search) {
              setTimeout(() => {
                document.getElementById("lodding").style.display = "block";
                document.getElementById("lodding").style.display = "none";
              }, 2000);
            }
            
            ipInfo(search);
          });

        if (myIp) {
          ipInfo(myIp);
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  setTimeout(() => {
    document.getElementById("lodding").style.display = "block";
    document.getElementById("lodding").style.display = "none";
    document.getElementById("info").textContent =
      "Your Public IP Information";
    document.getElementById("info").style.backgroundColor = "rgb(18, 0, 0)";

    getIPInfo();
  }, 2000);

  //ip information
  function ipInfo(myip) {
    fetch(`https://ipapi.co/${myip}/json/`)
      .then((response) => response.json())
      .then((data) => {
        const ipInfoElement = document.getElementById("ip-info");
        ipInfoElement.innerHTML = `
                   
                    <p>Your IP address is: ${data.ip}</p>
                    <p>Internet Provider: ${data.org}</p>
                    <p>IP Type: ${data.version}</p>
                    <p>Your country is: ${data.country_name}</p>
                    <p>Your city is: ${data.city}</p>
                    <p>Your Postal Code: ${data.postal}</p>
                    <p>Calling Code: ${data.country_calling_code}</p>
                    <p>latitude: ${data.latitude}</p>
                    <p>longitude: ${data.longitude}</p>
                `;

        const org = data.org || "";
        if (org.toLowerCase().includes("shared")) {
          document.getElementById("real").textContent =
            "Your IP address is shared";
        } else {
          document.getElementById("real").textContent =
            "Your IP address is dedicated or real";
          document.getElementById("real").style.color = "rgb(37, 177, 2)";
        }
      })
      .catch((error) =>
        console.error("Error fetching IP information:", error)
      );
  }