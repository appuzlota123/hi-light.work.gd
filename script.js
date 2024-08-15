document.getElementById('check-status').addEventListener('click', function() {
    const serverIp = document.getElementById('server-ip').value;
    const statusResult = document.getElementById('status-result');
    const loading = document.getElementById('loading');
    const serverInfo = document.getElementById('server-info');
    const status = document.getElementById('status');
    const motd = document.getElementById('motd');
    const version = document.getElementById('version');
    const protocol = document.getElementById('protocol');
    const ipAddress = document.getElementById('ip-address');
    const port = document.getElementById('port');
    const players = document.getElementById('players');

    if (serverIp.trim() === "") {
        statusResult.textContent = "Please enter a server IP or domain.";
        statusResult.style.color = 'orange';
        return;
    }

    loading.style.display = 'block';
    serverInfo.style.display = 'none';
    statusResult.textContent = "";

    fetch(`https://api.mcsrvstat.us/3/${serverIp}`)
        .then(response => response.json())
        .then(data => {
            loading.style.display = 'none';
            if (data.online) {
                statusResult.textContent = `The server at ${serverIp} is online!`;
                statusResult.style.color = 'green';
                status.textContent = 'Online';
                motd.textContent = data.motd?.clean.join(' ') || 'N/A';
                version.textContent = data.version || 'N/A';
                protocol.textContent = data.protocol || 'N/A';
                ipAddress.textContent = data.ip || serverIp;
                port.textContent = data.port || '25565';
                players.textContent = `${data.players?.online || 0} / ${data.players?.max || 0}`;
                serverInfo.style.display = 'block';
            } else {
                statusResult.textContent = `The server at ${serverIp} is offline.`;
                statusResult.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error fetching server data:', error);
            loading.style.display = 'none';
            statusResult.textContent = "Error checking server status. Please try again.";
            statusResult.style.color = 'orange';
        });
});
