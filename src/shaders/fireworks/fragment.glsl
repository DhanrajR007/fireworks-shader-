uniform sampler2D uTexture;
void main()
{  
    float textureColor = texture(uTexture,gl_PointCoord).r;
    gl_FragColor = vec4(1.0, 1.0 , 1.0, textureColor);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}