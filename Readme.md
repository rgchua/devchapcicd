# Public DNS for AWS
ec2-34-215-237-238.us-west-2.compute.amazonaws.com

# Commands to see the logs
## Get the container ID
docker ps

## See the logs for the container
docker logs <containerID>

# TODO
1. Determine where to put all repos calling endpoint
2. Check repo ID against local repo directories - git clone if new, git clean -x -d -f git pull if existing
3. Run tests on repo
4. Build src
5. Deploy container / application


