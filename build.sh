#!/bin/bash

ssh_profile="root@agencyboz"
user="agenc5523"
domain="agencyboz.com"
subdomain="startja.agencyboz.com"

path="/home/${domain}/${subdomain}"

npx vite build
echo 'Uploading build to server'
scp -r dist/* ${ssh_profile}:${path}
ssh ${ssh_profile} "chown -R ${user}:${user} ${path}/*"
