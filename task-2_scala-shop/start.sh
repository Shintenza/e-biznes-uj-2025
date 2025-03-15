#!/bin/bash

base_dir="./target/universal"
app_name="shop-1.0"
zip_location="${base_dir}/${app_name}.zip"
app_location="${base_dir}/${app_name}"

rm -rf ${zip_location}
rm -rf ${app_location}

sbt dist
cd ${base_dir}
unzip ${app_name}.zip

ngrok http 9000 > /dev/null &
echo "Wating for ngrok to start"
sleep 5
url="$(curl http://localhost:4040/api/tunnels | jq ".tunnels[0].public_url")"
echo "ngrok running on: ${url}"

${app_name}/bin/shop
