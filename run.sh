npm install

pm2 delete Preonboarding_project || true

pm2 start npm --name "Preonboarding_project" -- run start

pm2 save
