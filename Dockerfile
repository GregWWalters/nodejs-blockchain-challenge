FROM node:12.2
MAINTAINER Greg Walters <GregWWalters@gmail.com>
ENV INSTALL_PATH='/home/node/api' PORT=3000
WORKDIR $INSTALL_PATH

RUN mkdir -p $INSTALL_PATH \
	&& npm install -g express forever

COPY . $INSTALL_PATH

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
