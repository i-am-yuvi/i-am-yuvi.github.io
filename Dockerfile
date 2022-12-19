FROM node
WORKDIR yuvi-resume
COPY . .
EXPOSE 8000
CMD ["npx","http-server",".","-p","8000"]