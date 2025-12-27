uniform vec2 uResolution;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    gl_PointSize = 50.0  * uResolution.y;
    gl_PointSize *= 1.0/viewPosition.z;
}
