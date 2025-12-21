A **Docker image** is a **read-only template** that contains everything needed to run an application:

- Code
- Libraries
- Dependencies
- Configuration

Think of it as a **blueprint** for creating Docker containers.

<h2 style="color:#FF9800; font-weight:bold;">Key Points About Docker Images</h2>

1. **Template for Containers**
    
    - A container is **created from an image**.
        
    - Example: You pull `nginx:latest` and run a container from it.
        
2. **Read-Only**
    
    - Images cannot be changed directly.
        
    - Any changes happen inside the container; you can create a **new image** from it using `docker commit`.
        
3. **Layers**
    
    - Images are made of **layers**, each representing a set of changes.
        
    - Layers make images **efficient and reusable**.
        
4. **Portability**
    
    - You can share images via **Docker Hub** or private registries.
        
    - Any machine with Docker can run a container from the same image.
        
5. **Versioning (Tags)**
    
    - Images can have **tags** to specify versions.
        
    - Example: `python:3.12` or `ubuntu:22.04`.
    
   <p style="color:#FFB74D;">Real-Time Example</p>
- You want to run a **Python app**:
    
    1. Pull the Python image: `docker pull python:3.12`
        
    2. Run a container: `docker run -it python:3.12`
        
    3. Your app runs **exactly the same** on any machine with this image.