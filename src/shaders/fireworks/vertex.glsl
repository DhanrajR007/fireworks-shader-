uniform vec2 uResolution;
uniform float uSize;
uniform float uProgress;


attribute float aSize;
attribute float aTimeMultiplier;


float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax)
{
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main()
{
    float progress = uProgress * aTimeMultiplier;
    vec3 newPosition = position;

    //Exploding Progress
    float ExplodingProgress = remap(progress, 0.0, 0.1, 0.0, 1.0);
    ExplodingProgress = clamp(ExplodingProgress , 0.0 , 1.0);
    ExplodingProgress = 1.0- pow(1.0-ExplodingProgress , 3.0);
    newPosition *= ExplodingProgress;


    //Falling down
    float FallingProgress =  remap(progress, 0.1, 1.0, 0.0, 1.0);
    FallingProgress = clamp(FallingProgress , 0.0 , 1.0);
    FallingProgress = 1.0- pow(1.0-FallingProgress , 3.0);
    newPosition.y -= FallingProgress * 0.2;

    //Scalling 

    float sizeOpening = remap(progress,0.0,0.125,0.0,1.0);
    float sizeClosing = remap(progress,0.125,1.0,1.0,0.0);
    float sizeProgress = min(sizeOpening,sizeClosing);
    sizeProgress = clamp(sizeProgress,0.0,1.0);

    // twinkling 

    float twinklingProgress = remap(progress,0.2,0.8,0.0,1.0);
    twinklingProgress= clamp(twinklingProgress,0.0,1.0);

    float sizeTwinkling = sin(progress* 30.0);
    sizeTwinkling = 1.0 - sizeTwinkling * twinklingProgress;




    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    gl_PointSize = uSize * aSize * uResolution.y * sizeProgress * sizeTwinkling;
    gl_PointSize *= 1.0/-viewPosition.z;
}
 